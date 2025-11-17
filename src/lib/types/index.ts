import type { ReportStatus, Priority, Sender, WebhookType, ProjectUrlType } from '@prisma/client';

// Re-export Prisma enums
export { ReportStatus, Priority, Sender, WebhookType, ProjectUrlType };

// Organization types
export interface OrganizationSettings {
	timezone?: string;
	language?: string;
	retentionDays?: number;
}

// Project types
export interface ProjectSettings {
	requireEmail: boolean;
	allowAttachments: boolean;
	maxFileSize: number; // MB
	allowedFileTypes: string[];
	expiresAt?: string;
	geoRestrictions?: string[];
	ipWhitelist?: string[];
}

export interface ProjectTheme {
	primaryColor?: string;
	logoUrl?: string;
	customCss?: string;
}

// Report types
export interface ReportMetadata {
	userAgent?: string;
	referrer?: string;
	locale?: string;
}

// Webhook types
export interface WebhookConfig {
	botToken?: string; // For Telegram
	chatId?: string; // For Telegram
	webhookUrl?: string; // For Discord/Slack
	parseMode?: 'Markdown' | 'HTML';
	notifications?: {
		newReport: boolean;
		statusUpdate: boolean;
		newMessage: boolean;
	};
	template?: string;
}

export interface WebhookPayload {
	event: string;
	timestamp: string;
	organization: {
		id: string;
		name: string;
	};
	project: {
		id: string;
		name: string;
	};
	report: {
		id: string;
		token: string;
		title?: string;
		category?: string;
		priority: Priority;
		status: ReportStatus;
		preview: string;
		url: string;
	};
	signature?: string;
}

// Form types
export interface RegistrationData {
	organizationName: string;
	organizationSlug: string;
	adminEmail: string;
	adminPassword: string;
	adminName: string;
	acceptTerms: boolean;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface ReportSubmissionData {
	title?: string;
	content: string;
	category?: string;
	email?: string; // Optional for updates
	attachments?: File[];
}

// UI types
export interface DashboardStats {
	totalReports: number;
	newReports: number;
	inProgress: number;
	resolved: number;
	reportsByCategory: { category: string; count: number }[];
	reportsTrend: { date: string; count: number }[];
}

export interface ReportFilter {
	status?: ReportStatus[];
	priority?: Priority[];
	category?: string[];
	dateRange?: {
		from: Date;
		to: Date;
	};
	assignee?: string;
	search?: string;
}

export interface Pagination {
	page: number;
	pageSize: number;
	total: number;
}
