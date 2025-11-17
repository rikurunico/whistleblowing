<script lang="ts">
	import { FileText, Search, Filter, Plus } from 'lucide-svelte';

	// Mock data - will be replaced with real data from API
	const reports = [
		{
			id: '1',
			title: 'Safety concern in warehouse',
			category: 'Safety',
			status: 'NEW',
			priority: 'HIGH',
			createdAt: new Date('2024-01-15T10:30:00')
		},
		{
			id: '2',
			title: 'Financial irregularity',
			category: 'Corruption',
			status: 'IN_REVIEW',
			priority: 'CRITICAL',
			createdAt: new Date('2024-01-14T15:20:00')
		},
		{
			id: '3',
			title: 'Workplace harassment',
			category: 'Harassment',
			status: 'IN_PROGRESS',
			priority: 'MEDIUM',
			createdAt: new Date('2024-01-13T09:15:00')
		}
	];

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

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}
</script>

<svelte:head>
	<title>Reports - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Reports</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Manage and review all whistleblower reports
			</p>
		</div>
	</div>

	<!-- Filters & Search -->
	<div class="card-base p-4">
		<div class="flex flex-col sm:flex-row gap-4">
			<div class="flex-1 relative">
				<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
				<input
					type="text"
					placeholder="Search reports..."
					class="input-base pl-10 w-full"
				/>
			</div>
			<button class="btn-secondary flex items-center gap-2">
				<Filter class="w-4 h-4" />
				Filters
			</button>
		</div>
	</div>

	<!-- Reports List -->
	<div class="card-base">
		<div class="divide-y divide-surface-200 dark:divide-neutral-700">
			{#each reports as report}
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
								<span>{formatDate(report.createdAt)}</span>
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
					<p class="text-surface-600 dark:text-surface-400 mb-4">No reports yet</p>
					<p class="text-sm text-surface-500 dark:text-surface-500">
						Reports will appear here when whistleblowers submit them
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
