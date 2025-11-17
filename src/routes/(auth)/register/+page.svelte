<script lang="ts">
	import { Shield, Eye, EyeOff } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registrationSchema } from '$lib/schemas';

	let { data } = $props();

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		validators: zodClient(registrationSchema)
	});

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Register - OpenWhistle</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<!-- Logo -->
		<div class="text-center mb-8">
			<div class="inline-flex items-center gap-3 mb-4">
				<div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
					<Shield class="w-7 h-7 text-white" />
				</div>
				<span class="text-2xl font-bold text-surface-900 dark:text-white">OpenWhistle</span>
			</div>
			<h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
				Create Your Organization
			</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Start receiving secure anonymous reports
			</p>
		</div>

		<!-- Registration Form -->
		<div class="card-base p-8">
			<!-- Error Message -->
			{#if $message}
				<div class="mb-4 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
					<p class="text-sm text-error-700 dark:text-error-400">{$message}</p>
				</div>
			{/if}

			<form method="POST" use:enhance class="space-y-5">
				<!-- Organization Name -->
				<div>
					<label for="organizationName" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Organization Name
					</label>
					<input
						type="text"
						id="organizationName"
						name="organizationName"
						bind:value={$form.organizationName}
						class="input-base"
						placeholder="Acme Corporation"
						required
					/>
					{#if $errors.organizationName}
						<p class="mt-1 text-sm text-error-600">{$errors.organizationName}</p>
					{/if}
				</div>

				<!-- Organization Slug -->
				<div>
					<label for="organizationSlug" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Organization Slug
					</label>
					<div class="flex items-center gap-2">
						<input
							type="text"
							id="organizationSlug"
							name="organizationSlug"
							bind:value={$form.organizationSlug}
							class="input-base"
							placeholder="acme-corp"
							pattern="[a-z0-9-]+"
							required
						/>
					</div>
					<p class="mt-1 text-xs text-surface-500">
						Lowercase letters, numbers, and hyphens only
					</p>
					{#if $errors.organizationSlug}
						<p class="mt-1 text-sm text-error-600">{$errors.organizationSlug}</p>
					{/if}
				</div>

				<!-- Admin Name -->
				<div>
					<label for="adminName" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Your Name
					</label>
					<input
						type="text"
						id="adminName"
						name="adminName"
						bind:value={$form.adminName}
						class="input-base"
						placeholder="John Doe"
						required
					/>
					{#if $errors.adminName}
						<p class="mt-1 text-sm text-error-600">{$errors.adminName}</p>
					{/if}
				</div>

				<!-- Admin Email -->
				<div>
					<label for="adminEmail" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="adminEmail"
						name="adminEmail"
						bind:value={$form.adminEmail}
						class="input-base"
						placeholder="john@acme.com"
						required
					/>
					{#if $errors.adminEmail}
						<p class="mt-1 text-sm text-error-600">{$errors.adminEmail}</p>
					{/if}
				</div>

				<!-- Password -->
				<div>
					<label for="adminPassword" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Password
					</label>
					<div class="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							id="adminPassword"
							name="adminPassword"
							bind:value={$form.adminPassword}
							class="input-base pr-10"
							placeholder="••••••••••••"
							required
						/>
						<button
							type="button"
							class="absolute right-2 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
							onclick={() => (showPassword = !showPassword)}
						>
							{#if showPassword}
								<EyeOff class="w-5 h-5" />
							{:else}
								<Eye class="w-5 h-5" />
							{/if}
						</button>
					</div>
					<p class="mt-1 text-xs text-surface-500">
						Min 12 chars, uppercase, lowercase, number, special character
					</p>
					{#if $errors.adminPassword}
						<p class="mt-1 text-sm text-error-600">{$errors.adminPassword}</p>
					{/if}
				</div>

				<!-- Terms Acceptance -->
				<div class="flex items-start gap-2">
					<input
						type="checkbox"
						id="acceptTerms"
						name="acceptTerms"
						bind:checked={$form.acceptTerms}
						class="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 border-surface-300 rounded"
						required
					/>
					<label for="acceptTerms" class="text-sm text-surface-600 dark:text-surface-400">
						I accept the <a href="/terms" class="text-primary-600 hover:underline">Terms of Service</a>
						and <a href="/privacy" class="text-primary-600 hover:underline">Privacy Policy</a>
					</label>
				</div>
				{#if $errors.acceptTerms}
					<p class="text-sm text-error-600">{$errors.acceptTerms}</p>
				{/if}

				<!-- Submit Button -->
				<button
					type="submit"
					class="w-full btn-primary py-3"
					disabled={$delayed}
				>
					{#if $delayed}
						Creating Account...
					{:else}
						Create Organization
					{/if}
				</button>
			</form>

			<!-- Login Link -->
			<div class="mt-6 text-center">
				<p class="text-sm text-surface-600 dark:text-surface-400">
					Already have an account?
					<a href="/login" class="text-primary-600 hover:underline font-medium">
						Sign in
					</a>
				</p>
			</div>
		</div>

		<!-- Back to Home -->
		<div class="mt-6 text-center">
			<a href="/" class="text-sm text-surface-500 hover:text-primary-600">
				← Back to Home
			</a>
		</div>
	</div>
</div>
