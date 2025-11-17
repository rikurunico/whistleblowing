<script lang="ts">
	import { Settings, Building, Bell, Shield, Palette } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Settings - OpenWhistle</title>
</svelte:head>

<div class="space-y-6">
	<!-- Page Header -->
	<div>
		<h1 class="text-3xl font-bold text-surface-900 dark:text-white mb-2">Settings</h1>
		<p class="text-surface-600 dark:text-surface-400">
			Manage your organization and account preferences
		</p>
	</div>

	<!-- Settings Sections -->
	<div class="space-y-6">
		<!-- Organization Settings -->
		<div class="card-base p-6">
			<div class="flex items-center gap-3 mb-6">
				<div class="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
					<Building class="w-5 h-5 text-primary-600 dark:text-primary-400" />
				</div>
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white">Organization</h2>
			</div>
			<div class="space-y-4">
				<div>
					<label for="org-name" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Organization Name
					</label>
					<input
						type="text"
						id="org-name"
						value="My Organization"
						class="input-base w-full"
					/>
				</div>
				<div>
					<label for="org-slug" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Organization Slug
					</label>
					<input
						type="text"
						id="org-slug"
						value="my-organization"
						class="input-base w-full"
					/>
					<p class="text-sm text-surface-500 dark:text-surface-400 mt-1">
						Used in URLs: yoursite.com/org/my-organization
					</p>
				</div>
				<button class="btn-primary">Save Changes</button>
			</div>
		</div>

		<!-- Notification Settings -->
		<div class="card-base p-6">
			<div class="flex items-center gap-3 mb-6">
				<div class="p-2 bg-warning-100 dark:bg-warning-900/20 rounded-lg">
					<Bell class="w-5 h-5 text-warning-600 dark:text-warning-400" />
				</div>
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white">Notifications</h2>
			</div>
			<div class="space-y-3">
				<label class="flex items-center justify-between p-3 hover:bg-surface-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer">
					<span class="text-sm text-surface-700 dark:text-surface-300">Email notifications for new reports</span>
					<input type="checkbox" checked class="checkbox" />
				</label>
				<label class="flex items-center justify-between p-3 hover:bg-surface-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer">
					<span class="text-sm text-surface-700 dark:text-surface-300">Email notifications for report updates</span>
					<input type="checkbox" checked class="checkbox" />
				</label>
				<label class="flex items-center justify-between p-3 hover:bg-surface-50 dark:hover:bg-neutral-700/50 rounded-lg cursor-pointer">
					<span class="text-sm text-surface-700 dark:text-surface-300">Daily summary emails</span>
					<input type="checkbox" class="checkbox" />
				</label>
			</div>
		</div>

		<!-- Security Settings -->
		<div class="card-base p-6">
			<div class="flex items-center gap-3 mb-6">
				<div class="p-2 bg-error-100 dark:bg-error-900/20 rounded-lg">
					<Shield class="w-5 h-5 text-error-600 dark:text-error-400" />
				</div>
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white">Security</h2>
			</div>
			<div class="space-y-4">
				<div>
					<h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Change Password
					</h3>
					<button class="btn-secondary">Update Password</button>
				</div>
				<div class="pt-4 border-t border-surface-200 dark:border-neutral-700">
					<h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Two-Factor Authentication
					</h3>
					<p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
						Add an extra layer of security to your account
					</p>
					<button class="btn-secondary">Enable 2FA</button>
				</div>
			</div>
		</div>

		<!-- Appearance Settings -->
		<div class="card-base p-6">
			<div class="flex items-center gap-3 mb-6">
				<div class="p-2 bg-tertiary-100 dark:bg-tertiary-900/20 rounded-lg">
					<Palette class="w-5 h-5 text-tertiary-600 dark:text-tertiary-400" />
				</div>
				<h2 class="text-lg font-semibold text-surface-900 dark:text-white">Appearance</h2>
			</div>
			<div class="space-y-4">
				<div>
					<label for="theme" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Theme
					</label>
					<select id="theme" class="input-base w-full max-w-xs">
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						<option value="system">System</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Danger Zone -->
		<div class="card-base p-6 border-2 border-error-200 dark:border-error-900/50">
			<h2 class="text-lg font-semibold text-error-600 dark:text-error-400 mb-4">Danger Zone</h2>
			<div class="space-y-4">
				<div>
					<h3 class="text-sm font-medium text-surface-900 dark:text-white mb-1">
						Delete Organization
					</h3>
					<p class="text-sm text-surface-600 dark:text-surface-400 mb-3">
						Permanently delete this organization and all associated data. This action cannot be undone.
					</p>
					<button class="btn-secondary text-error-600 dark:text-error-400 border-error-600">
						Delete Organization
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
