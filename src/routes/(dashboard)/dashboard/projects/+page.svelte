<script lang="ts">
	import { Folder, Plus, Search, ExternalLink } from 'lucide-svelte';

	// Mock data - will be replaced with real data from API
	const projects = [
		{
			id: '1',
			name: 'Employee Feedback Portal',
			description: 'Anonymous feedback system for internal employees',
			publicToken: 'emp-feedback-2024',
			isActive: true,
			reportCount: 12,
			createdAt: new Date('2024-01-01T00:00:00')
		},
		{
			id: '2',
			name: 'Safety Concerns',
			description: 'Report workplace safety issues anonymously',
			publicToken: 'safety-2024',
			isActive: true,
			reportCount: 8,
			createdAt: new Date('2024-01-15T00:00:00')
		}
	];

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(date);
	}
</script>

<svelte:head>
	<title>Projects - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Projects</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Manage your whistleblowing portals and reporting channels
			</p>
		</div>
		<a href="/dashboard/projects/new" class="btn-primary flex items-center gap-2">
			<Plus class="w-4 h-4" />
			New Project
		</a>
	</div>

	<!-- Search -->
	<div class="card-base p-4">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
			<input
				type="text"
				placeholder="Search projects..."
				class="input-base pl-10 w-full"
			/>
		</div>
	</div>

	<!-- Projects Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each projects as project}
			<div class="card-base p-6 hover:shadow-lg transition-shadow">
				<div class="flex items-start justify-between mb-4">
					<div class="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
						<Folder class="w-6 h-6 text-primary-600 dark:text-primary-400" />
					</div>
					<span class="badge {project.isActive ? 'badge-success' : 'badge'}">
						{project.isActive ? 'Active' : 'Inactive'}
					</span>
				</div>

				<h3 class="text-lg font-semibold text-surface-900 dark:text-white mb-2">
					{project.name}
				</h3>
				<p class="text-sm text-surface-600 dark:text-surface-400 mb-4 line-clamp-2">
					{project.description}
				</p>

				<div class="space-y-3 pt-4 border-t border-surface-200 dark:border-neutral-700">
					<div class="flex items-center justify-between text-sm">
						<span class="text-surface-500 dark:text-surface-400">Reports</span>
						<span class="font-medium text-surface-900 dark:text-white">{project.reportCount}</span>
					</div>
					<div class="flex items-center justify-between text-sm">
						<span class="text-surface-500 dark:text-surface-400">Created</span>
						<span class="font-medium text-surface-900 dark:text-white">{formatDate(project.createdAt)}</span>
					</div>
				</div>

				<div class="flex gap-2 mt-4">
					<a href="/dashboard/projects/{project.id}" class="btn-secondary flex-1 text-center">
						Manage
					</a>
					<a
						href="/p/{project.publicToken}"
						target="_blank"
						class="btn-secondary px-3"
						title="View public portal"
					>
						<ExternalLink class="w-4 h-4" />
					</a>
				</div>
			</div>
		{:else}
			<div class="col-span-full card-base p-12 text-center">
				<Folder class="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
				<p class="text-surface-600 dark:text-surface-400 mb-4">No projects yet</p>
				<a href="/dashboard/projects/new" class="btn-primary inline-flex items-center gap-2">
					<Plus class="w-4 h-4" />
					Create Your First Project
				</a>
			</div>
		{/each}
	</div>
</div>
