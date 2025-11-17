import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas';
import { lucia } from '$lib/server/auth';
import db from '$lib/server/db';
import { verifyPassword } from '$lib/server/encryption';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Redirect if already logged in
	if (event.locals.user) {
		throw redirect(302, '/dashboard');
	}

	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			// Find admin by email
			const admin = await db.admin.findUnique({
				where: { email }
			});

			if (!admin) {
				return fail(400, {
					form,
					message: 'Invalid email or password'
				});
			}

			// Verify password
			const validPassword = verifyPassword(password, admin.passwordHash);

			if (!validPassword) {
				return fail(400, {
					form,
					message: 'Invalid email or password'
				});
			}

			// Create session
			const session = await lucia.createSession(admin.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});

			// Log audit event
			await db.auditLog.create({
				data: {
					organizationId: admin.organizationId,
					action: 'USER_LOGIN',
					entityType: 'admin',
					entityId: admin.id,
					userId: admin.id,
					metadata: {
						email: admin.email
					}
				}
			});
		} catch (error) {
			console.error('Login error:', error);
			return fail(500, {
				form,
				message: 'An error occurred during login. Please try again.'
			});
		}

		throw redirect(302, '/dashboard');
	}
};
