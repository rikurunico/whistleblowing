<script lang="ts">
	import { ArrowLeft, Folder } from 'lucide-svelte';
</script>

<svelte:head>
	<title>New Project - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Back Button -->
	<a href="/dashboard/projects" class="inline-flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400">
		<ArrowLeft class="w-4 h-4" />
		Back to Projects
	</a>

	<!-- Page Header -->
	<div>
		<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Create New Project</h1>
		<p class="text-surface-600 dark:text-surface-400">
			Set up a new whistleblowing portal for your organization
		</p>
	</div>

	<!-- Form -->
	<div class="max-w-2xl">
		<form method="POST" class="space-y-6">
			<div class="card-base p-6 space-y-6">
				<div>
					<label for="name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Project Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="e.g., Employee Feedback Portal"
						class="input-base w-full"
					/>
				</div>

				<div>
					<label for="description" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						rows="3"
						placeholder="Brief description of this project..."
						class="input-base w-full"
					></textarea>
				</div>

				<div>
					<label for="publicToken" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Public Token *
					</label>
					<input
						type="text"
						id="publicToken"
						name="publicToken"
						required
						placeholder="e.g., employee-feedback"
						class="input-base w-full"
					/>
					<p class="text-sm text-surface-500 dark:text-surface-400 mt-1">
						This will be used in the public URL: yoursite.com/p/public-token
					</p>
				</div>

				<div>
					<label for="customMessage" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Custom Message
					</label>
					<textarea
						id="customMessage"
						name="customMessage"
						rows="3"
						placeholder="Message to show on the submission form..."
						class="input-base w-full"
					></textarea>
				</div>

				<div>
					<label class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Categories
					</label>
					<div class="space-y-2">
						<label class="flex items-center gap-2">
							<input type="checkbox" name="categories" value="Safety" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Safety</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="categories" value="Corruption" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Corruption</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="categories" value="Harassment" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Harassment</span>
						</label>
						<label class="flex items-center gap-2">
							<input type="checkbox" name="categories" value="Other" class="checkbox" />
							<span class="text-sm text-surface-700 dark:text-surface-300">Other</span>
						</label>
					</div>
				</div>

				<div>
					<label class="flex items-center gap-2">
						<input type="checkbox" name="isActive" checked class="checkbox" />
						<span class="text-sm text-surface-700 dark:text-surface-300">Active (accepting submissions)</span>
					</label>
				</div>
			</div>

			<div class="flex gap-3">
				<button type="submit" class="btn-primary">
					Create Project
				</button>
				<a href="/dashboard/projects" class="btn-secondary">
					Cancel
				</a>
			</div>
		</form>
	</div>
</div>
