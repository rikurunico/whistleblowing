import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const projects = await db.project.findMany({
		where: {
			organizationId: user.organizationId
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			name: true,
			description: true,
			publicToken: true,
			isActive: true,
			createdAt: true,
			_count: {
				select: {
					reports: true
				}
			}
		}
	});

	return {
		projects: projects.map((project) => ({
			id: project.id,
			name: project.name,
			description: project.description,
			publicToken: project.publicToken,
			isActive: project.isActive,
			reportCount: project._count.reports,
			createdAt: project.createdAt.toISOString()
		}))
	};
};
