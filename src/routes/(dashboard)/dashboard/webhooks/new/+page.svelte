<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>New Webhook - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Back Button -->
	<a href="/dashboard/webhooks" class="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400">
		<ArrowLeft class="w-4 h-4" />
		Back to Webhooks
	</a>

	<!-- Page Header -->
	<div>
		<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Create New Webhook</h1>
		<p class="text-surface-600 dark:text-surface-400">
			Set up notifications and integrations for your reports
		</p>
	</div>

	<!-- Form -->
	<div class="max-w-2xl">
		<form method="POST" class="space-y-6">
			<div class="card-base p-6 space-y-6">
				<div>
					<label for="name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Webhook Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="e.g., Slack Notifications"
						class="input-base w-full"
					/>
				</div>

				<div>
					<label for="type" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Type *
					</label>
					<select id="type" name="type" required class="input-base w-full">
						<option value="">Select webhook type...</option>
						<option value="SLACK">Slack</option>
						<option value="DISCORD">Discord</option>
						<option value="TELEGRAM">Telegram</option>
						<option value="WHATSAPP">WhatsApp</option>
						<option value="CUSTOM_HTTP">Custom HTTP</option>
					</select>
				</div>

				<div>
					<label for="url" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Webhook URL *
					</label>
					<input
						type="url"
						id="url"
						name="url"
						required
						placeholder="https://hooks.slack.com/services/..."
						class="input-base w-full"
					/>
				</div>

				<div>
					<label for="secret" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Secret Key (Optional)
					</label>
					<input
						type="password"
						id="secret"
						name="secret"
						placeholder="For signing webhook payloads"
						class="input-base w-full"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Events *
					</label>
					<div class="space-y-2">
						<label class="flex items-center gap-2">
							<input type="checkbox" name="events" value="report.created" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Report Created</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="events" value="report.updated" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Report Updated</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="events" value="report.resolved" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Report Resolved</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="events" value="message.received" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Message Received</span>
						</label>
					</div>
				</div>

				<div>
					<label class="flex items-center gap-2">
						<input type="checkbox" name="isActive" checked class="checkbox" />
						<span class="text-sm text-surface-700 dark:text-surface-300">Active</span>
					</label>
				</div>
			</div>

			<div class="flex gap-3">
				<button type="submit" class="btn-primary">
					Create Webhook
				</button>
				<a href="/dashboard/webhooks" class="btn-secondary">
					Cancel
				</a>
			</div>
		</form>
	</div>
</div>
