import db from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = locals.user!;

	const report = await db.report.findFirst({
		where: {
			id: params.id,
			project: {
				organizationId: user.organizationId
			}
		},
		include: {
			attachments: {
				select: {
					id: true,
					originalFilename: true,
					mimeType: true,
					size: true,
					createdAt: true
				}
			},
			conversations: {
				orderBy: {
					createdAt: 'asc'
				},
				select: {
					id: true,
					messageEncrypted: true,
					sender: true,
					createdAt: true
				}
			}
		}
	});

	if (!report) {
		throw error(404, 'Report not found');
	}

	// Decrypt content (for now just parse the JSON)
	let content = 'Encrypted content';
	try {
		const parsed = JSON.parse(report.contentEncrypted);
		content = parsed.content || 'No content';
	} catch {
		content = report.contentEncrypted;
	}

	// Decrypt conversations
	const conversations = report.conversations.map((conv) => {
		let message = 'Encrypted message';
		try {
			const parsed = JSON.parse(conv.messageEncrypted);
			message = parsed.message || 'No message';
		} catch {
			message = conv.messageEncrypted;
		}
		return {
			id: conv.id,
			message,
			sender: conv.sender,
			createdAt: conv.createdAt.toISOString()
		};
	});

	return {
		report: {
			id: report.id,
			title: report.title,
			category: report.category,
			status: report.status,
			priority: report.priority,
			content,
			submitterEmail: report.submitterEmail,
			createdAt: report.createdAt.toISOString(),
			resolvedAt: report.resolvedAt?.toISOString() || null,
			attachments: report.attachments.map((att) => ({
				id: att.id,
				name: att.originalFilename,
				mimeType: att.mimeType,
				size: att.size,
				createdAt: att.createdAt.toISOString()
			})),
			conversations
		}
	};
};
