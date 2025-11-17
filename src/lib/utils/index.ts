import { nanoid } from 'nanoid';

/**
 * Generate a URL-safe slug from text
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique public token for projects
 */
export function generatePublicToken(): string {
	return nanoid(16);
}

/**
 * Generate a unique report tracking token
 */
export function generateReportToken(): string {
	return nanoid(24);
}

/**
 * Generate a short URL code
 */
export function generateShortCode(): string {
	return nanoid(8);
}

/**
 * Format a date relative to now (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffDays > 7) {
		return date.toLocaleDateString();
	} else if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
	} else if (diffMins > 0) {
		return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
	} else {
		return 'Just now';
	}
}

/**
 * Format a date and time
 */
export function formatDateTime(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate password strength
 * Requirements: min 12 chars, uppercase, lowercase, number, special char
 */
export function isValidPassword(password: string): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (password.length < 12) {
		errors.push('Password must be at least 12 characters long');
	}
	if (!/[A-Z]/.test(password)) {
		errors.push('Password must contain at least one uppercase letter');
	}
	if (!/[a-z]/.test(password)) {
		errors.push('Password must contain at least one lowercase letter');
	}
	if (!/[0-9]/.test(password)) {
		errors.push('Password must contain at least one number');
	}
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		errors.push('Password must contain at least one special character');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
	// Basic sanitization - in production, use a library like DOMPurify
	return html
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
}

/**
 * Generate QR code data URL
 */
export async function generateQRCode(text: string): Promise<string> {
	// Placeholder - implement with QR code library
	return `data:image/svg+xml,${encodeURIComponent('<svg></svg>')}`;
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - 3) + '...';
}
