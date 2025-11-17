<script lang="ts">
	import { Shield, Lock, Eye, Globe } from 'lucide-svelte';
</script>

<svelte:head>
	<title>OpenWhistle - Secure Anonymous Reporting Platform</title>
	<meta
		name="description"
		content="Open-source multi-tenant whistleblower platform for secure anonymous reporting"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-800">
	<!-- Header -->
	<header class="border-b border-surface-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
						<Shield class="w-6 h-6 text-white" />
					</div>
					<span class="text-xl font-bold text-surface-900 dark:text-white">OpenWhistle</span>
				</div>
				<div class="flex items-center gap-4">
					<a href="/login" class="text-surface-600 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
						Login
					</a>
					<a href="/register" class="btn-primary">
						Get Started
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center mb-16">
			<h1 class="text-5xl md:text-6xl font-bold text-surface-900 dark:text-white mb-6">
				Secure Anonymous
				<span class="text-primary-600 dark:text-primary-400">Reporting</span>
			</h1>
			<p class="text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8">
				Open-source multi-tenant whistleblower platform that enables organizations to receive
				anonymous reports securely through customizable links.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/register" class="btn-primary text-lg px-8 py-3">
					Start Free Trial
				</a>
				<a
					href="https://github.com/yourusername/openwhistle"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-secondary text-lg px-8 py-3"
				>
					View on GitHub
				</a>
			</div>
		</div>

		<!-- Features Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
			<div class="card-base p-6 text-center hover:shadow-md transition-shadow">
				<div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Lock class="w-6 h-6 text-primary-600 dark:text-primary-400" />
				</div>
				<h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
					End-to-End Encryption
				</h3>
				<p class="text-surface-600 dark:text-surface-400 text-sm">
					All reports are encrypted with AES-256-GCM for maximum security
				</p>
			</div>

			<div class="card-base p-6 text-center hover:shadow-md transition-shadow">
				<div class="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Eye class="w-6 h-6 text-success-600 dark:text-success-400" />
				</div>
				<h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
					Complete Anonymity
				</h3>
				<p class="text-surface-600 dark:text-surface-400 text-sm">
					No IP tracking, no accounts required for whistleblowers
				</p>
			</div>

			<div class="card-base p-6 text-center hover:shadow-md transition-shadow">
				<div class="w-12 h-12 bg-tertiary-100 dark:bg-tertiary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Globe class="w-6 h-6 text-tertiary-600 dark:text-tertiary-400" />
				</div>
				<h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
					Custom URLs
				</h3>
				<p class="text-surface-600 dark:text-surface-400 text-sm">
					Generate disguised URLs and QR codes for discrete reporting
				</p>
			</div>

			<div class="card-base p-6 text-center hover:shadow-md transition-shadow">
				<div class="w-12 h-12 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
					<Shield class="w-6 h-6 text-warning-600 dark:text-warning-400" />
				</div>
				<h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
					Webhook Notifications
				</h3>
				<p class="text-surface-600 dark:text-surface-400 text-sm">
					Real-time alerts via Telegram, Discord, or custom webhooks
				</p>
			</div>
		</div>

		<!-- Stats -->
		<div class="card-base p-8 mb-20">
			<div class="grid md:grid-cols-3 gap-8 text-center">
				<div>
					<div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">100%</div>
					<div class="text-surface-600 dark:text-surface-400">Open Source</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">10K+</div>
					<div class="text-surface-600 dark:text-surface-400">Concurrent Users</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.9%</div>
					<div class="text-surface-600 dark:text-surface-400">Uptime SLA</div>
				</div>
			</div>
		</div>

		<!-- CTA -->
		<div class="text-center">
			<h2 class="text-3xl font-bold text-surface-900 dark:text-white mb-4">
				Ready to get started?
			</h2>
			<p class="text-surface-600 dark:text-surface-300 mb-8">
				Create your organization account in minutes
			</p>
			<a href="/register" class="btn-primary text-lg px-8 py-3">
				Sign Up Now
			</a>
		</div>
	</main>

	<!-- Footer -->
	<footer class="border-t border-surface-200 dark:border-neutral-700 mt-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<div class="text-surface-600 dark:text-surface-400 text-sm">
					© 2024 OpenWhistle. Licensed under MIT License.
				</div>
				<div class="flex gap-6">
					<a href="/docs" class="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
						Documentation
					</a>
					<a href="/privacy" class="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
						Privacy Policy
					</a>
					<a href="/terms" class="text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
