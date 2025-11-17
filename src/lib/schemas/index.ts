import { z } from 'zod';

// Organization Registration Schema
export const registrationSchema = z.object({
	organizationName: z
		.string()
		.min(3, 'Organization name must be at least 3 characters')
		.max(100, 'Organization name must be less than 100 characters'),
	organizationSlug: z
		.string()
		.min(3, 'Slug must be at least 3 characters')
		.max(50, 'Slug must be less than 50 characters')
		.regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
	adminEmail: z.string().email('Invalid email address'),
	adminPassword: z
		.string()
		.min(12, 'Password must be at least 12 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
	adminName: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be less than 100 characters'),
	acceptTerms: z.boolean().refine((val) => val === true, {
		message: 'You must accept the terms and conditions'
	})
});

// Login Schema
export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password is required')
});

// Project Creation Schema
export const projectSchema = z.object({
	name: z
		.string()
		.min(3, 'Project name must be at least 3 characters')
		.max(200, 'Project name must be less than 200 characters'),
	description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
	categories: z.array(z.string()).default([]),
	customMessage: z.string().max(1000, 'Custom message must be less than 1000 characters').optional(),
	settings: z.object({
		requireEmail: z.boolean().default(false),
		allowAttachments: z.boolean().default(true),
		maxFileSize: z.number().min(1).max(50).default(10),
		allowedFileTypes: z.array(z.string()).default(['image/*', '.pdf', '.doc', '.docx'])
	})
});

// Report Submission Schema
export const reportSubmissionSchema = z.object({
	title: z.string().max(200, 'Title must be less than 200 characters').optional(),
	content: z
		.string()
		.min(20, 'Report must be at least 20 characters')
		.max(50000, 'Report must be less than 50,000 characters'),
	category: z.string().optional(),
	email: z.string().email('Invalid email address').optional().or(z.literal(''))
});

// Webhook Configuration Schema
export const webhookSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	type: z.enum(['TELEGRAM', 'DISCORD', 'SLACK', 'CUSTOM_HTTP', 'WHATSAPP']),
	url: z.string().url('Invalid URL').optional(),
	events: z.array(z.string()).min(1, 'At least one event must be selected'),
	config: z.object({
		botToken: z.string().optional(),
		chatId: z.string().optional(),
		webhookUrl: z.string().optional(),
		parseMode: z.enum(['Markdown', 'HTML']).optional(),
		notifications: z
			.object({
				newReport: z.boolean(),
				statusUpdate: z.boolean(),
				newMessage: z.boolean()
			})
			.optional()
	})
});

// Report Update Schema
export const reportUpdateSchema = z.object({
	status: z.enum(['NEW', 'IN_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'ARCHIVED']).optional(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional()
});

// Message Schema
export const messageSchema = z.object({
	message: z.string().min(1, 'Message is required').max(10000, 'Message is too long')
});
