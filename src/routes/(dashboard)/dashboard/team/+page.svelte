<script lang="ts">
	import { Users, Plus, Search, Mail, Shield } from 'lucide-svelte';

	// Mock data - will be replaced with real data from API
	const teamMembers = [
		{
			id: '1',
			name: 'John Doe',
			email: 'john@example.com',
			role: 'ADMIN',
			createdAt: new Date('2024-01-01T00:00:00')
		},
		{
			id: '2',
			name: 'Jane Smith',
			email: 'jane@example.com',
			role: 'MEMBER',
			createdAt: new Date('2024-01-15T00:00:00')
		}
	];

	function getRoleBadge(role: string) {
		switch (role) {
			case 'SUPER_ADMIN':
				return 'badge-error';
			case 'ADMIN':
				return 'badge-primary';
			case 'MEMBER':
				return 'badge-secondary';
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
	<title>Team - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Team</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Manage team members and their permissions
			</p>
		</div>
		<button class="btn-primary flex items-center gap-2">
			<Plus class="w-4 h-4" />
			Invite Member
		</button>
	</div>

	<!-- Search -->
	<div class="card-base p-4">
		<div class="relative">
			<Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
			<input
				type="text"
				placeholder="Search team members..."
				class="input-base pl-10 w-full"
			/>
		</div>
	</div>

	<!-- Team Members List -->
	<div class="card-base">
		<div class="divide-y divide-surface-200 dark:divide-neutral-700">
			{#each teamMembers as member}
				<div class="p-6">
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-4 flex-1 min-w-0">
							<div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0">
								<span class="text-primary-700 dark:text-primary-400 font-medium">
									{member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
								</span>
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<h3 class="font-medium text-surface-900 dark:text-white">
										{member.name}
									</h3>
									<span class="badge {getRoleBadge(member.role)}">
										{member.role}
									</span>
								</div>
								<div class="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
									<Mail class="w-4 h-4" />
									{member.email}
								</div>
								<p class="text-xs text-surface-500 dark:text-surface-400 mt-1">
									Joined {formatDate(member.createdAt)}
								</p>
							</div>
						</div>
						<div class="flex gap-2">
							<button class="btn-secondary text-sm">Edit</button>
							<button class="btn-secondary text-sm text-error-600">Remove</button>
						</div>
					</div>
				</div>
			{:else}
				<div class="p-12 text-center">
					<Users class="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
					<p class="text-surface-600 dark:text-surface-400 mb-4">No team members yet</p>
					<button class="btn-primary inline-flex items-center gap-2">
						<Plus class="w-4 h-4" />
						Invite Your First Team Member
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Roles Info -->
	<div class="card-base p-6">
		<h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
			<Shield class="w-5 h-5" />
			Role Permissions
		</h2>
		<div class="space-y-3 text-sm">
			<div class="flex items-start gap-3">
				<span class="badge badge-error">SUPER_ADMIN</span>
				<p class="text-surface-600 dark:text-surface-400">
					Full access to all features and organization settings
				</p>
			</div>
			<div class="flex items-start gap-3">
				<span class="badge badge-primary">ADMIN</span>
				<p class="text-surface-600 dark:text-surface-400">
					Can manage projects, reports, and team members
				</p>
			</div>
			<div class="flex items-start gap-3">
				<span class="badge badge-secondary">MEMBER</span>
				<p class="text-surface-600 dark:text-surface-400">
					Can view and manage reports only
				</p>
			</div>
		</div>
	</div>
</div>
