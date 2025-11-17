import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user!;

	const teamMembers = await db.admin.findMany({
		where: {
			organizationId: user.organizationId
		},
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true
		}
	});

	return {
		teamMembers: teamMembers.map((member) => ({
			id: member.id,
			name: member.name,
			email: member.email,
			role: member.role,
			createdAt: member.createdAt.toISOString()
		}))
	};
};
