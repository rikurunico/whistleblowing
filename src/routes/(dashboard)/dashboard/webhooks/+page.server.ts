import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const webhooks = await db.webhook.findMany({
		where: {
			organizationId: user.organizationId
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			type: true,
			url: true,
			events: true,
			isActive: true,
			createdAt: true
		}
	});

	return {
		webhooks: webhooks.map((webhook) => ({
			id: webhook.id,
			name: webhook.name,
			type: webhook.type,
			url: webhook.url,
			events: webhook.events,
			isActive: webhook.isActive,
			createdAt: webhook.createdAt.toISOString()
		}))
	};
};
