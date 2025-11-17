import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registrationSchema } from '$lib/schemas';
import { lucia } from '$lib/server/auth';
import db from '$lib/server/db';
import { hashPassword } from '$lib/server/encryption';
import { slugify, generatePublicToken } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Redirect if already logged in
	if (event.locals.user) {
		throw redirect(302, '/dashboard');
	}

	const form = await superValidate(zod(registrationSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(registrationSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { organizationName, organizationSlug, adminEmail, adminPassword, adminName } =
			form.data;

		try {
			// Check if organization slug already exists
			const existingOrg = await db.organization.findUnique({
				where: { slug: organizationSlug }
			});

			if (existingOrg) {
				return fail(400, {
					form,
					message: 'Organization slug already exists. Please choose a different one.'
				});
			}

			// Check if email already exists
			const existingAdmin = await db.admin.findUnique({
				where: { email: adminEmail }
			});

			if (existingAdmin) {
				return fail(400, {
					form,
					message: 'Email already registered. Please use a different email or login.'
				});
			}

			// Hash password
			const passwordHash = hashPassword(adminPassword);

			// Create organization and admin in a transaction
			const result = await db.$transaction(async (tx) => {
				// Create organization
				const organization = await tx.organization.create({
					data: {
						name: organizationName,
						slug: organizationSlug,
						settings: {}
					}
				});

				// Create admin user
				const admin = await tx.admin.create({
					data: {
						email: adminEmail,
						passwordHash,
						name: adminName,
						role: 'ADMIN',
						organizationId: organization.id
					}
				});

				// Create a default project
				await tx.project.create({
					data: {
						organizationId: organization.id,
						name: 'Default Project',
						description: 'Your first reporting project',
						publicToken: generatePublicToken(),
						categories: ['Corruption', 'Safety', 'Harassment', 'Other'],
						settings: {
							requireEmail: false,
							allowAttachments: true,
							maxFileSize: 10,
							allowedFileTypes: ['image/*', '.pdf', '.doc', '.docx']
						},
						theme: {},
						isActive: true
					}
				});

				return { organization, admin };
			});

			// Create session
			const session = await lucia.createSession(result.admin.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			// Log audit event
			await db.auditLog.create({
				data: {
					organizationId: result.organization.id,
					action: 'ORGANIZATION_CREATED',
					entityType: 'organization',
					entityId: result.organization.id,
					userId: result.admin.id,
					metadata: {
						organizationName,
						adminEmail
					}
				}
			});
		} catch (error) {
			console.error('Registration error:', error);
			return fail(500, {
				form,
				message: 'An error occurred during registration. Please try again.'
			});
		}

		throw redirect(302, '/dashboard');
	}
};
