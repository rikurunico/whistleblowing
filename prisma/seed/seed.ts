import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Starting database seeding...');

	// Clear existing data (in development only)
	console.log('🗑️  Clearing existing data...');
	await prisma.conversation.deleteMany();
	await prisma.attachment.deleteMany();
	await prisma.report.deleteMany();
	await prisma.projectUrl.deleteMany();
	await prisma.project.deleteMany();
	await prisma.webhookDelivery.deleteMany();
	await prisma.webhook.deleteMany();
	await prisma.auditLog.deleteMany();
	await prisma.session.deleteMany();
	await prisma.admin.deleteMany();
	await prisma.organization.deleteMany();

	console.log('✅ Existing data cleared');

	// Create Organization
	console.log('🏢 Creating organization...');
	const organization = await prisma.organization.create({
		data: {
			name: 'Acme Corporation',
			slug: 'acme-corp',
			settings: {
				timezone: 'Asia/Jakarta',
				language: 'id',
				emailNotifications: true
			}
		}
	});
	console.log(`✅ Organization created: ${organization.name}`);

	// Create Admins
	console.log('👥 Creating admin users...');
	const passwordHash = await hash('password123', {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const superAdmin = await prisma.admin.create({
		data: {
			email: 'admin@acme.com',
			passwordHash,
			name: 'John Doe',
			role: 'SUPER_ADMIN',
			organizationId: organization.id
		}
	});

	const admin = await prisma.admin.create({
		data: {
			email: 'jane@acme.com',
			passwordHash,
			name: 'Jane Smith',
			role: 'ADMIN',
			organizationId: organization.id
		}
	});

	const member = await prisma.admin.create({
		data: {
			email: 'bob@acme.com',
			passwordHash,
			name: 'Bob Wilson',
			role: 'MEMBER',
			organizationId: organization.id
		}
	});

	console.log(`✅ Created ${[superAdmin, admin, member].length} admin users`);

	// Create Projects
	console.log('📁 Creating projects...');
	const project1 = await prisma.project.create({
		data: {
			organizationId: organization.id,
			name: 'Employee Feedback Portal',
			description: 'Anonymous feedback system for internal employees to report concerns',
			publicToken: 'employee-feedback',
			categories: ['Safety', 'Harassment', 'Corruption', 'Other'],
			customMessage: 'Your voice matters. Report any concerns anonymously and securely.',
			isActive: true,
			settings: {
				allowAnonymous: true,
				requireEmail: false,
				autoNotify: true
			},
			theme: {
				primaryColor: '#3B82F6',
				logoUrl: ''
			}
		}
	});

	const project2 = await prisma.project.create({
		data: {
			organizationId: organization.id,
			name: 'Safety Incident Reports',
			description: 'Report workplace safety incidents and near-misses',
			publicToken: 'safety-reports',
			categories: ['Workplace Safety', 'Equipment Failure', 'Hazardous Conditions'],
			customMessage: 'Safety is our priority. Report any incidents immediately.',
			isActive: true,
			settings: {
				allowAnonymous: true,
				requireEmail: true,
				autoNotify: true
			},
			theme: {
				primaryColor: '#EF4444',
				logoUrl: ''
			}
		}
	});

	const project3 = await prisma.project.create({
		data: {
			organizationId: organization.id,
			name: 'Ethics Hotline',
			description: 'Report ethical violations and compliance issues',
			publicToken: 'ethics-hotline',
			categories: ['Fraud', 'Conflict of Interest', 'Data Privacy', 'Discrimination'],
			isActive: false,
			settings: {
				allowAnonymous: true,
				requireEmail: false,
				autoNotify: false
			},
			theme: {
				primaryColor: '#8B5CF6',
				logoUrl: ''
			}
		}
	});

	console.log(`✅ Created ${[project1, project2, project3].length} projects`);

	// Create Project URLs
	console.log('🔗 Creating project URLs...');
	await prisma.projectUrl.createMany({
		data: [
			{
				projectId: project1.id,
				type: 'MAIN',
				slug: 'employee-feedback-main',
				fullUrl: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/p/employee-feedback`,
				shortUrl: '/p/employee-feedback',
				isActive: true
			},
			{
				projectId: project1.id,
				type: 'ALIAS',
				slug: 'emp-fb',
				fullUrl: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/p/emp-fb`,
				shortUrl: '/p/emp-fb',
				isActive: true
			},
			{
				projectId: project2.id,
				type: 'MAIN',
				slug: 'safety-reports-main',
				fullUrl: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/p/safety-reports`,
				shortUrl: '/p/safety-reports',
				isActive: true
			}
		]
	});
	console.log('✅ Project URLs created');

	// Create Reports
	console.log('📝 Creating reports...');
	const reports = await Promise.all([
		prisma.report.create({
			data: {
				projectId: project1.id,
				reportToken: 'RPT-001-' + Date.now(),
				title: 'Unsafe working conditions in warehouse',
				contentEncrypted: JSON.stringify({
					content:
						'There are several safety hazards in the main warehouse facility including broken lighting, slippery floors, and improperly stored heavy equipment.'
				}),
				category: 'Safety',
				status: 'NEW',
				priority: 'HIGH',
				submitterEmail: 'anonymous@whistleblower.local',
				metadata: {
					ipAddress: '192.168.1.100',
					userAgent: 'Mozilla/5.0',
					submittedVia: 'web'
				},
				createdAt: new Date('2024-01-15T10:30:00')
			}
		}),
		prisma.report.create({
			data: {
				projectId: project1.id,
				reportToken: 'RPT-002-' + Date.now(),
				title: 'Financial irregularities in accounting department',
				contentEncrypted: JSON.stringify({
					content:
						'I have noticed suspicious transactions and potential embezzlement in the accounting department. Records show discrepancies in vendor payments.'
				}),
				category: 'Corruption',
				status: 'IN_REVIEW',
				priority: 'CRITICAL',
				submitterEmail: null,
				metadata: {
					ipAddress: '192.168.1.101',
					userAgent: 'Mozilla/5.0',
					submittedVia: 'web'
				},
				createdAt: new Date('2024-01-14T15:20:00')
			}
		}),
		prisma.report.create({
			data: {
				projectId: project1.id,
				reportToken: 'RPT-003-' + Date.now(),
				title: 'Workplace harassment complaint',
				contentEncrypted: JSON.stringify({
					content:
						'A manager in the sales department has been making inappropriate comments and creating a hostile work environment for several team members.'
				}),
				category: 'Harassment',
				status: 'IN_PROGRESS',
				priority: 'MEDIUM',
				submitterEmail: 'concerned@whistleblower.local',
				metadata: {
					ipAddress: '192.168.1.102',
					userAgent: 'Mozilla/5.0',
					submittedVia: 'web'
				},
				createdAt: new Date('2024-01-13T09:15:00')
			}
		}),
		prisma.report.create({
			data: {
				projectId: project2.id,
				reportToken: 'RPT-004-' + Date.now(),
				title: 'Near-miss incident with forklift',
				contentEncrypted: JSON.stringify({
					content:
						'A forklift nearly collided with a worker due to poor visibility and lack of warning signals in the loading area.'
				}),
				category: 'Workplace Safety',
				status: 'RESOLVED',
				priority: 'HIGH',
				submitterEmail: 'safety@acme.com',
				metadata: {
					ipAddress: '192.168.1.103',
					userAgent: 'Mozilla/5.0',
					submittedVia: 'web'
				},
				createdAt: new Date('2024-01-10T14:00:00'),
				resolvedAt: new Date('2024-01-12T16:30:00')
			}
		}),
		prisma.report.create({
			data: {
				projectId: project2.id,
				reportToken: 'RPT-005-' + Date.now(),
				title: 'Faulty emergency exit door',
				contentEncrypted: JSON.stringify({
					content: 'The emergency exit door on the third floor is jammed and cannot be opened easily.'
				}),
				category: 'Hazardous Conditions',
				status: 'NEW',
				priority: 'CRITICAL',
				submitterEmail: null,
				metadata: {
					ipAddress: '192.168.1.104',
					userAgent: 'Mozilla/5.0',
					submittedVia: 'web'
				},
				createdAt: new Date('2024-01-16T08:00:00')
			}
		})
	]);

	console.log(`✅ Created ${reports.length} reports`);

	// Create Conversations
	console.log('💬 Creating conversations...');
	await prisma.conversation.createMany({
		data: [
			{
				reportId: reports[0].id,
				messageEncrypted: JSON.stringify({
					message: 'Thank you for your report. We are investigating this matter.'
				}),
				sender: 'ADMIN',
				createdAt: new Date('2024-01-15T14:00:00')
			},
			{
				reportId: reports[0].id,
				messageEncrypted: JSON.stringify({
					message: 'Can you provide more details about the specific location in the warehouse?'
				}),
				sender: 'ADMIN',
				createdAt: new Date('2024-01-15T14:30:00')
			},
			{
				reportId: reports[0].id,
				messageEncrypted: JSON.stringify({
					message: 'The issues are primarily in the north section, near loading dock 3.'
				}),
				sender: 'WHISTLEBLOWER',
				createdAt: new Date('2024-01-15T16:00:00')
			},
			{
				reportId: reports[1].id,
				messageEncrypted: JSON.stringify({
					message: 'This is a serious allegation. Our audit team will review the records immediately.'
				}),
				sender: 'ADMIN',
				createdAt: new Date('2024-01-14T16:00:00')
			}
		]
	});
	console.log('✅ Conversations created');

	// Create Webhooks
	console.log('🔔 Creating webhooks...');
	const webhook1 = await prisma.webhook.create({
		data: {
			organizationId: organization.id,
			name: 'Slack Notifications',
			type: 'SLACK',
			url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX',
			secret: 'slack-webhook-secret-key',
			events: ['report.created', 'report.updated', 'report.resolved'],
			isActive: true,
			config: {
				channel: '#whistleblower-alerts',
				username: 'OpenWhistle Bot',
				iconEmoji: ':shield:'
			}
		}
	});

	const webhook2 = await prisma.webhook.create({
		data: {
			organizationId: organization.id,
			name: 'Discord Alerts',
			type: 'DISCORD',
			url: 'https://discord.com/api/webhooks/000000000000000000/XXXXXXXXXXXXXXXXXXXX',
			events: ['report.created'],
			isActive: true,
			config: {
				username: 'OpenWhistle',
				avatarUrl: ''
			}
		}
	});

	const webhook3 = await prisma.webhook.create({
		data: {
			organizationId: organization.id,
			name: 'Email Notifications',
			type: 'CUSTOM_HTTP',
			url: 'https://api.acme.com/webhooks/reports',
			secret: 'custom-webhook-secret',
			events: ['report.created', 'report.updated', 'report.resolved', 'message.received'],
			isActive: false,
			config: {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer token123'
				}
			}
		}
	});

	console.log(`✅ Created ${[webhook1, webhook2, webhook3].length} webhooks`);

	// Create Webhook Deliveries
	console.log('📨 Creating webhook deliveries...');
	await prisma.webhookDelivery.createMany({
		data: [
			{
				webhookId: webhook1.id,
				event: 'report.created',
				payload: {
					reportId: reports[0].id,
					title: reports[0].title,
					category: reports[0].category,
					priority: reports[0].priority
				},
				response: { message: 'ok' },
				statusCode: 200,
				success: true,
				attempts: 1,
				createdAt: new Date('2024-01-15T10:31:00')
			},
			{
				webhookId: webhook1.id,
				event: 'report.created',
				payload: {
					reportId: reports[1].id,
					title: reports[1].title,
					category: reports[1].category,
					priority: reports[1].priority
				},
				response: { message: 'ok' },
				statusCode: 200,
				success: true,
				attempts: 1,
				createdAt: new Date('2024-01-14T15:21:00')
			},
			{
				webhookId: webhook2.id,
				event: 'report.created',
				payload: {
					reportId: reports[2].id,
					title: reports[2].title,
					category: reports[2].category,
					priority: reports[2].priority
				},
				response: null,
				statusCode: 500,
				success: false,
				attempts: 3,
				createdAt: new Date('2024-01-13T09:16:00')
			}
		]
	});
	console.log('✅ Webhook deliveries created');

	// Create Audit Logs
	console.log('📋 Creating audit logs...');
	await prisma.auditLog.createMany({
		data: [
			{
				organizationId: organization.id,
				action: 'admin.created',
				entityType: 'Admin',
				entityId: admin.id,
				userId: superAdmin.id,
				metadata: {
					email: admin.email,
					role: admin.role
				},
				ipAddress: '192.168.1.1',
				userAgent: 'Mozilla/5.0',
				createdAt: new Date('2024-01-01T12:00:00')
			},
			{
				organizationId: organization.id,
				action: 'project.created',
				entityType: 'Project',
				entityId: project1.id,
				userId: superAdmin.id,
				metadata: {
					projectName: project1.name,
					publicToken: project1.publicToken
				},
				ipAddress: '192.168.1.1',
				userAgent: 'Mozilla/5.0',
				createdAt: new Date('2024-01-02T10:00:00')
			},
			{
				organizationId: organization.id,
				action: 'report.status_changed',
				entityType: 'Report',
				entityId: reports[1].id,
				userId: admin.id,
				metadata: {
					oldStatus: 'NEW',
					newStatus: 'IN_REVIEW'
				},
				ipAddress: '192.168.1.2',
				userAgent: 'Mozilla/5.0',
				createdAt: new Date('2024-01-14T16:00:00')
			}
		]
	});
	console.log('✅ Audit logs created');

	console.log('\n🎉 Database seeding completed successfully!');
	console.log('\n📊 Summary:');
	console.log(`   Organizations: 1`);
	console.log(`   Admins: 3`);
	console.log(`   Projects: 3`);
	console.log(`   Reports: ${reports.length}`);
	console.log(`   Webhooks: 3`);
	console.log('\n🔐 Login credentials:');
	console.log(`   Email: admin@acme.com`);
	console.log(`   Password: password123`);
	console.log(`\n   Email: jane@acme.com`);
	console.log(`   Password: password123`);
	console.log(`\n   Email: bob@acme.com`);
	console.log(`   Password: password123`);
}

main()
	.catch((e) => {
		console.error('❌ Error during seeding:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
