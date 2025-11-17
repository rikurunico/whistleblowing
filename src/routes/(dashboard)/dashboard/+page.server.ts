import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	// Get stats
	const [totalReports, newReports, inProgressReports, resolvedReports, recentReports, projects] =
		await Promise.all([
			// Total reports count
			db.report.count({
				where: {
					project: {
						organizationId: user.organizationId
					}
				}
			}),

			// New reports count
			db.report.count({
				where: {
					status: 'NEW',
					project: {
						organizationId: user.organizationId
					}
				}
			}),

			// In progress reports count
			db.report.count({
				where: {
					status: {
						in: ['IN_REVIEW', 'IN_PROGRESS']
					},
					project: {
						organizationId: user.organizationId
					}
				}
			}),

			// Resolved reports count
			db.report.count({
				where: {
					status: 'RESOLVED',
					project: {
						organizationId: user.organizationId
					}
				}
			}),

			// Recent reports (last 5)
			db.report.findMany({
				where: {
					project: {
						organizationId: user.organizationId
					}
				},
				take: 5,
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
			}),

			// Get projects count
			db.project.count({
				where: {
					organizationId: user.organizationId
				}
			})
		]);

	return {
		stats: {
			totalReports,
			newReports,
			inProgress: inProgressReports,
			resolved: resolvedReports,
			totalProjects: projects
		},
		recentReports: recentReports.map((report) => ({
			id: report.id,
			title: report.title,
			category: report.category,
			status: report.status,
			priority: report.priority,
			createdAt: report.createdAt.toISOString()
		}))
	};
};
