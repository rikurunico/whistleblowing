<script lang="ts">
	import { FileText, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const stats = data.stats;
	const recentReports = data.recentReports.map((r) => ({
		...r,
		createdAt: new Date(r.createdAt)
	}));

	function getStatusColor(status: string) {
		switch (status) {
			case 'NEW':
				return 'badge-primary';
			case 'IN_REVIEW':
				return 'badge-warning';
			case 'IN_PROGRESS':
				return 'badge-warning';
			case 'RESOLVED':
				return 'badge-success';
			default:
				return 'badge';
		}
	}

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'CRITICAL':
				return 'text-error-600 dark:text-error-400';
			case 'HIGH':
				return 'text-warning-600 dark:text-warning-400';
			case 'MEDIUM':
				return 'text-primary-600 dark:text-primary-400';
			default:
				return 'text-surface-600 dark:text-surface-400';
		}
	}

	function formatRelativeTime(date: Date) {
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);

		if (diffDays > 0) {
			return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
		} else if (diffHours > 0) {
			return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
		} else {
			return 'Just now';
		}
	}
</script>

<svelte:head>
	<title>Dashboard - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div>
		<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Dashboard</h1>
		<p class="text-surface-600 dark:text-surface-400">
			Welcome back! Here's what's happening with your reports.
		</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<!-- Total Reports -->
		<div class="card-base p-6">
			<div class="flex items-center justify-between mb-4">
				<div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
					<FileText class="w-6 h-6 text-primary-600 dark:text-primary-400" />
				</div>
				<TrendingUp class="w-5 h-5 text-success-500" />
			</div>
			<div>
				<p class="text-sm text-surface-600 dark:text-surface-400 mb-1">Total Reports</p>
				<p class="text-3xl font-bold text-surface-900 dark:text-white">{stats.totalReports}</p>
			</div>
		</div>

		<!-- New Reports -->
		<div class="card-base p-6">
			<div class="flex items-center justify-between mb-4">
				<div class="p-3 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
					<AlertCircle class="w-6 h-6 text-warning-600 dark:text-warning-400" />
				</div>
			</div>
			<div>
				<p class="text-sm text-surface-600 dark:text-surface-400 mb-1">New Reports</p>
				<p class="text-3xl font-bold text-surface-900 dark:text-white">{stats.newReports}</p>
			</div>
		</div>

		<!-- In Progress -->
		<div class="card-base p-6">
			<div class="flex items-center justify-between mb-4">
				<div class="p-3 bg-tertiary-100 dark:bg-tertiary-900/20 rounded-lg">
					<Clock class="w-6 h-6 text-tertiary-600 dark:text-tertiary-400" />
				</div>
			</div>
			<div>
				<p class="text-sm text-surface-600 dark:text-surface-400 mb-1">In Progress</p>
				<p class="text-3xl font-bold text-surface-900 dark:text-white">{stats.inProgress}</p>
			</div>
		</div>

		<!-- Resolved -->
		<div class="card-base p-6">
			<div class="flex items-center justify-between mb-4">
				<div class="p-3 bg-success-100 dark:bg-success-900/20 rounded-lg">
					<CheckCircle class="w-6 h-6 text-success-600 dark:text-success-400" />
				</div>
			</div>
			<div>
				<p class="text-sm text-surface-600 dark:text-surface-400 mb-1">Resolved</p>
				<p class="text-3xl font-bold text-surface-900 dark:text-white">{stats.resolved}</p>
			</div>
		</div>
	</div>

	<!-- Recent Reports -->
	<div class="card-base">
		<div class="p-6 border-b border-surface-200 dark:border-neutral-700">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white">Recent Reports</h2>
				<a href="/dashboard/reports" class="text-sm text-primary-600 hover:underline">
					View all
				</a>
			</div>
		</div>
		<div class="divide-y divide-surface-200 dark:divide-neutral-700">
			{#each recentReports as report}
				<a
					href="/dashboard/reports/{report.id}"
					class="block p-6 hover:bg-surface-50 dark:hover:bg-neutral-700/50 transition-colors"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 mb-2">
								<span class="badge {getStatusColor(report.status)}">
									{report.status.replace('_', ' ')}
								</span>
								<span class="text-sm {getPriorityColor(report.priority)}">
									{report.priority}
								</span>
							</div>
							<h3 class="font-medium text-surface-900 dark:text-white mb-1">
								{report.title || 'Untitled Report'}
							</h3>
							<div class="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
								<span>{report.category}</span>
								<span>•</span>
								<span>{formatRelativeTime(report.createdAt)}</span>
							</div>
						</div>
						<div class="text-surface-400 dark:text-surface-500">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</a>
			{:else}
				<div class="p-12 text-center">
					<FileText class="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
					<p class="text-surface-600 dark:text-surface-400">No reports yet</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<div class="card-base p-6">
			<h3 class="font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h3>
			<div class="space-y-3">
				<a href="/dashboard/projects/new" class="btn-primary w-full text-center">
					Create New Project
				</a>
				<a href="/dashboard/webhooks/new" class="btn-secondary w-full text-center">
					Configure Webhook
				</a>
			</div>
		</div>

		<div class="card-base p-6">
			<h3 class="font-semibold text-surface-900 dark:text-white mb-4">Need Help?</h3>
			<div class="space-y-3 text-sm">
				<a
					href="/docs"
					class="block text-primary-600 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					📚 View Documentation
				</a>
				<a
					href="https://github.com/yourusername/openwhistle/discussions"
					class="block text-primary-600 hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					💬 Community Discussions
				</a>
				<a href="mailto:support@openwhistle.org" class="block text-primary-600 hover:underline">
					✉️ Contact Support
				</a>
			</div>
		</div>
	</div>
</div>
