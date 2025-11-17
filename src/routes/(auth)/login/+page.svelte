<script lang="ts">
	import { Shield, Eye, EyeOff } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas';

	let { data } = $props();

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		validators: zodClient(loginSchema)
	});

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Login - OpenWhistle</title>
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
				Welcome Back
			</h1>
			<p class="text-surface-600 dark:text-surface-400">
				Sign in to access your dashboard
			</p>
		</div>

		<!-- Login Form -->
		<div class="card-base p-8">
			{#if $message}
				<div class="mb-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
					<p class="text-sm text-error-700 dark:text-error-400">{$message}</p>
				</div>
			{/if}

			<form method="POST" use:enhance class="space-y-5">
				<!-- Email -->
				<div>
					<label for="email" class="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						bind:value={$form.email}
						class="input-base"
						placeholder="you@example.com"
						required
						autofocus
					/>
					{#if $errors.email}
						<p class="mt-1 text-sm text-error-600">{$errors.email}</p>
					{/if}
				</div>

				<!-- Password -->
				<div>
					<div class="flex items-center justify-between mb-2">
						<label for="password" class="block text-sm font-medium text-surface-700 dark:text-surface-300">
							Password
						</label>
						<a href="/forgot-password" class="text-sm text-primary-600 hover:underline">
							Forgot password?
						</a>
					</div>
					<div class="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							bind:value={$form.password}
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
					{#if $errors.password}
						<p class="mt-1 text-sm text-error-600">{$errors.password}</p>
					{/if}
				</div>

				<!-- Submit Button -->
				<button
					type="submit"
					class="w-full btn-primary py-3"
					disabled={$delayed}
				>
					{#if $delayed}
						Signing in...
					{:else}
						Sign In
					{/if}
				</button>
			</form>

			<!-- Register Link -->
			<div class="mt-6 text-center">
				<p class="text-sm text-surface-600 dark:text-surface-400">
					Don't have an account?
					<a href="/register" class="text-primary-600 hover:underline font-medium">
						Create one
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
