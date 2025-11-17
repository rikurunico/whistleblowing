import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

/**
 * Get encryption key from environment variable or generate one
 */
function getEncryptionKey(): Buffer {
	const key = process.env.ENCRYPTION_KEY;
	if (!key) {
		throw new Error('ENCRYPTION_KEY environment variable is not set');
	}

	// If the key is a hex string, convert it to buffer
	if (key.length === KEY_LENGTH * 2) {
		return Buffer.from(key, 'hex');
	}

	// Otherwise, derive key using scrypt
	return scryptSync(key, 'salt', KEY_LENGTH);
}

/**
 * Encrypt text using AES-256-GCM
 * @param text - Plain text to encrypt
 * @returns Encrypted string in format: iv:authTag:encryptedData (all hex encoded)
 */
export function encrypt(text: string): string {
	try {
		const key = getEncryptionKey();
		const iv = randomBytes(IV_LENGTH);

		const cipher = createCipheriv(ALGORITHM, key, iv);

		let encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		const authTag = cipher.getAuthTag();

		// Return format: iv:authTag:encryptedData
		return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
	} catch (error) {
		console.error('Encryption error:', error);
		throw new Error('Failed to encrypt data');
	}
}

/**
 * Decrypt encrypted text
 * @param encryptedText - Encrypted string in format: iv:authTag:encryptedData
 * @returns Decrypted plain text
 */
export function decrypt(encryptedText: string): string {
	try {
		const key = getEncryptionKey();
		const parts = encryptedText.split(':');

		if (parts.length !== 3) {
			throw new Error('Invalid encrypted data format');
		}

		const [ivHex, authTagHex, encryptedData] = parts;

		const iv = Buffer.from(ivHex, 'hex');
		const authTag = Buffer.from(authTagHex, 'hex');

		const decipher = createDecipheriv(ALGORITHM, key, iv);
		decipher.setAuthTag(authTag);

		let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
		decrypted += decipher.final('utf8');

		return decrypted;
	} catch (error) {
		console.error('Decryption error:', error);
		throw new Error('Failed to decrypt data');
	}
}

/**
 * Generate a random encryption key
 * @returns Hex-encoded encryption key
 */
export function generateEncryptionKey(): string {
	return randomBytes(KEY_LENGTH).toString('hex');
}

/**
 * Hash a password using scrypt
 * @param password - Plain password
 * @returns Hashed password
 */
export function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

/**
 * Verify a password against a hash
 * @param password - Plain password
 * @param hashedPassword - Hashed password
 * @returns True if password matches
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
	const [salt, hash] = hashedPassword.split(':');
	const hashToVerify = scryptSync(password, salt, 64).toString('hex');
	return hash === hashToVerify;
}
