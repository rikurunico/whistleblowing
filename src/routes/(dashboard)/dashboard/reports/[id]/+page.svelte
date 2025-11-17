<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft, FileText, Calendar, AlertCircle, MessageSquare, Paperclip } from 'lucide-svelte';

	// Mock data - will be replaced with real data from API
	const report = {
		id: $page.params.id,
		title: 'Safety concern in warehouse',
		category: 'Safety',
		status: 'NEW',
		priority: 'HIGH',
		content: 'There is a serious safety concern in the main warehouse facility...',
		createdAt: new Date('2024-01-15T10:30:00'),
		submitterEmail: 'anonymous@example.com',
		attachments: []
	};

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
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}
</script>

<svelte:head>
	<title>Report #{report.id} - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Back Button -->
	<a href="/dashboard/reports" class="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400">
		<ArrowLeft class="w-4 h-4" />
		Back to Reports
	</a>

	<!-- Report Header -->
	<div class="card-base p-6">
		<div class="flex items-start justify-between gap-4 mb-4">
			<div class="flex-1">
				<div class="flex items-center gap-2 mb-3">
					<span class="badge {getStatusColor(report.status)}">
						{report.status.replace('_', ' ')}
					</span>
					<span class="text-sm font-medium {getPriorityColor(report.priority)}">
						{report.priority} PRIORITY
					</span>
				</div>
				<h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
					{report.title || 'Untitled Report'}
				</h1>
				<div class="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
					<span class="flex items-center gap-1">
						<Calendar class="w-4 h-4" />
						{formatDate(report.createdAt)}
					</span>
					<span>•</span>
					<span>{report.category}</span>
					<span>•</span>
					<span>Report #{report.id}</span>
				</div>
			</div>
			<div class="flex gap-2">
				<button class="btn-secondary">Update Status</button>
				<button class="btn-primary">Take Action</button>
			</div>
		</div>
	</div>

	<!-- Report Content -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Main Content -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Report Details -->
			<div class="card-base p-6">
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Report Details</h2>
				<div class="prose dark:prose-invert max-w-none">
					<p class="text-surface-700 dark:text-surface-300">
						{report.content}
					</p>
				</div>
			</div>

			<!-- Attachments -->
			{#if report.attachments.length > 0}
				<div class="card-base p-6">
					<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
						<Paperclip class="w-5 h-5" />
						Attachments
					</h2>
					<div class="space-y-2">
						{#each report.attachments as attachment}
							<a href={attachment.url} class="block p-3 border border-surface-200 dark:border-neutral-700 rounded-lg hover:bg-surface-50 dark:hover:bg-neutral-700/50">
								{attachment.name}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Conversation -->
			<div class="card-base p-6">
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
					<MessageSquare class="w-5 h-5" />
					Conversation
				</h2>
				<div class="text-center py-8 text-surface-500 dark:text-surface-400">
					No messages yet
				</div>
			</div>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Metadata -->
			<div class="card-base p-6">
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Information</h2>
				<dl class="space-y-3 text-sm">
					<div>
						<dt class="text-surface-500 dark:text-surface-400">Status</dt>
						<dd class="font-medium text-surface-900 dark:text-white mt-1">
							{report.status.replace('_', ' ')}
						</dd>
					</div>
					<div>
						<dt class="text-surface-500 dark:text-surface-400">Priority</dt>
						<dd class="font-medium text-surface-900 dark:text-white mt-1">
							{report.priority}
						</dd>
					</div>
					<div>
						<dt class="text-surface-500 dark:text-surface-400">Category</dt>
						<dd class="font-medium text-surface-900 dark:text-white mt-1">
							{report.category}
						</dd>
					</div>
					<div>
						<dt class="text-surface-500 dark:text-surface-400">Submitted</dt>
						<dd class="font-medium text-surface-900 dark:text-white mt-1">
							{formatDate(report.createdAt)}
						</dd>
					</div>
				</dl>
			</div>

			<!-- Actions -->
			<div class="card-base p-6">
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Actions</h2>
				<div class="space-y-2">
					<button class="btn-secondary w-full">Change Status</button>
					<button class="btn-secondary w-full">Assign to Team Member</button>
					<button class="btn-secondary w-full">Add Note</button>
					<button class="btn-secondary w-full text-error-600">Archive Report</button>
				</div>
			</div>
		</div>
	</div>
</div>
