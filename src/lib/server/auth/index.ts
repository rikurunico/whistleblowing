import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import db from '../db';

const adapter = new PrismaAdapter(db.session, db.admin);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			name: attributes.name,
			role: attributes.role,
			organizationId: attributes.organizationId
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			name: string;
			role: string;
			organizationId: string;
		};
	}
}

export type Auth = typeof lucia;
