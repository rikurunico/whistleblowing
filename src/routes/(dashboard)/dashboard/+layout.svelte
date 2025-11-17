<script lang="ts">
	import {
		Shield,
		Home,
		FileText,
		Folder,
		Webhook,
		Users,
		Settings,
		Bell,
		Menu,
		X,
		LogOut
	} from 'lucide-svelte';
	import { page } from '$app/stores';

	let { data, children } = $props();

	let sidebarOpen = $state(false);

	function isActive(path: string) {
		return $page.url.pathname === path || $page.url.pathname.startsWith(path + '/');
	}
</script>

<div class="min-h-screen bg-surface-50 dark:bg-neutral-900">
	<!-- Sidebar -->
	<aside
		class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 border-r border-surface-200 dark:border-neutral-700 transform transition-transform duration-200 z-40
		{sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0"
	>
		<div class="flex flex-col h-full">
			<!-- Logo -->
			<div class="p-6 border-b border-surface-200 dark:border-neutral-700">
				<div class="flex items-center gap-3">
					<div
						class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0"
					>
						<Shield class="w-6 h-6 text-white" />
					</div>
					<span class="font-bold text-lg text-surface-900 dark:text-white">OpenWhistle</span>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 p-4 overflow-y-auto scrollbar-thin">
				<div class="space-y-1">
					<a
						href="/dashboard"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard') && !isActive('/dashboard/')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<Home class="w-5 h-5" />
						<span class="font-medium">Overview</span>
					</a>

					<a
						href="/dashboard/reports"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard/reports')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<FileText class="w-5 h-5" />
						<span class="font-medium">Reports</span>
						<span class="ml-auto badge badge-primary">3</span>
					</a>

					<a
						href="/dashboard/projects"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard/projects')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<Folder class="w-5 h-5" />
						<span class="font-medium">Projects</span>
					</a>

					<a
						href="/dashboard/webhooks"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard/webhooks')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<Webhook class="w-5 h-5" />
						<span class="font-medium">Webhooks</span>
					</a>

					<a
						href="/dashboard/team"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard/team')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<Users class="w-5 h-5" />
						<span class="font-medium">Team</span>
					</a>

					<a
						href="/dashboard/settings"
						class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
						{isActive('/dashboard/settings')
							? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
							: 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-neutral-700'}"
					>
						<Settings class="w-5 h-5" />
						<span class="font-medium">Settings</span>
					</a>
				</div>
			</nav>

			<!-- User Profile -->
			<div class="p-4 border-t border-surface-200 dark:border-neutral-700">
				<div class="flex items-center gap-3 mb-3">
					<div
						class="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0"
					>
						<span class="text-primary-700 dark:text-primary-400 font-medium text-sm">
							{data.user.name
								.split(' ')
								.map((n) => n[0])
								.join('')
								.toUpperCase()}
						</span>
					</div>
					<div class="flex-1 min-w-0">
						<p class="text-sm font-medium text-surface-900 dark:text-white truncate">
							{data.user.name}
						</p>
						<p class="text-xs text-surface-500 dark:text-surface-400 truncate">
							{data.user.email}
						</p>
					</div>
				</div>
				<form method="POST" action="/logout">
					<button
						type="submit"
						class="w-full flex items-center gap-2 px-3 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors"
					>
						<LogOut class="w-4 h-4" />
						<span>Sign Out</span>
					</button>
				</form>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="lg:ml-64">
		<!-- Top Bar -->
		<header
			class="h-16 bg-white dark:bg-neutral-800 border-b border-surface-200 dark:border-neutral-700 px-6 flex items-center justify-between sticky top-0 z-30"
		>
			<div class="flex items-center gap-4">
				<button class="lg:hidden text-surface-700 dark:text-surface-300" onclick={() => (sidebarOpen = !sidebarOpen)}>
					<Menu class="w-6 h-6" />
				</button>
			</div>

			<div class="flex items-center gap-4">
				<!-- Notification Bell -->
				<button
					class="relative p-2 text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-neutral-700 rounded-lg"
				>
					<Bell class="w-5 h-5" />
					<span
						class="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full ring-2 ring-white dark:ring-neutral-800"
					></span>
				</button>
			</div>
		</header>

		<!-- Page Content -->
		<main class="p-6">
			{@render children()}
		</main>
	</div>

	<!-- Mobile Sidebar Overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
			onclick={() => (sidebarOpen = false)}
			role="button"
			tabindex="-1"
		></div>
	{/if}
</div>
