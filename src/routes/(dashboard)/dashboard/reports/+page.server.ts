import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const reports = await db.report.findMany({
		where: {
			project: {
				organizationId: user.organizationId
			}
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			title: true,
			category: true,
			status: true,
			priority: true,
			createdAt: true
		}
	});

	return {
		reports: reports.map((report) => ({
			id: report.id,
			title: report.title,
			category: report.category,
			status: report.status,
			priority: report.priority,
			createdAt: report.createdAt.toISOString()
		}))
	};
};
