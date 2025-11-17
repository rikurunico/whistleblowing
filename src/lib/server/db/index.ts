import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const db =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: dev ? ['query', 'error', 'warn'] : ['error']
	});

if (dev) globalForPrisma.prisma = db;

export default db;
