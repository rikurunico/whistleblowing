<script lang="ts">
	import { Webhook, Plus, Search } from 'lucide-svelte';

	// Mock data - will be replaced with real data from API
	const webhooks = [
		{
			id: '1',
			name: 'Slack Notifications',
			type: 'SLACK',
			url: 'https://hooks.slack.com/services/...',
			isActive: true,
			events: ['report.created', 'report.updated'],
			createdAt: new Date('2024-01-01T00:00:00')
		}
	];

	function getWebhookTypeColor(type: string) {
		switch (type) {
			case 'SLACK':
				return 'badge-primary';
			case 'DISCORD':
				return 'badge-secondary';
			case 'TELEGRAM':
				return 'badge-tertiary';
			default:
				return 'badge';
		}
	}

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>Webhooks - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Webhooks</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Configure notifications and integrations
			</p>
		</div>
		<a href="/dashboard/webhooks/new" class="btn-primary flex items-center gap-2">
			<Plus class="w-4 h-4" />
			New Webhook
		</a>
	</div>

	<!-- Search -->
	<div class="card-base p-4">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
			<input
				type="text"
				placeholder="Search webhooks..."
				class="input-base pl-10 w-full"
			/>
		</div>
	</div>

	<!-- Webhooks List -->
	<div class="card-base">
		<div class="divide-y divide-surface-200 dark:divide-neutral-700">
			{#each webhooks as webhook}
				<div class="p-6">
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-2 mb-2">
								<span class="badge {getWebhookTypeColor(webhook.type)}">
									{webhook.type}
								</span>
								<span class="badge {webhook.isActive ? 'badge-success' : 'badge'}">
									{webhook.isActive ? 'Active' : 'Inactive'}
								</span>
							</div>
							<h3 class="font-medium text-surface-900 dark:text-white mb-1">
								{webhook.name}
							</h3>
							<p class="text-sm text-surface-500 dark:text-surface-400 mb-2 truncate">
								{webhook.url}
							</p>
							<div class="flex flex-wrap gap-1">
								{#each webhook.events as event}
									<span class="text-xs px-2 py-1 bg-surface-100 dark:bg-neutral-700 text-surface-600 dark:text-surface-400 rounded">
										{event}
									</span>
								{/each}
							</div>
						</div>
						<div class="flex gap-2">
							<button class="btn-secondary text-sm">Edit</button>
							<button class="btn-secondary text-sm">Test</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="p-12 text-center">
					<Webhook class="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
					<p class="text-surface-600 dark:text-surface-400 mb-4">No webhooks configured</p>
					<a href="/dashboard/webhooks/new" class="btn-primary inline-flex items-center gap-2">
						<Plus class="w-4 h-4" />
						Create Your First Webhook
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>
