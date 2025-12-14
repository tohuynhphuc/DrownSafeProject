<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Emptynavbar from '$lib/emptynavbar.svelte';
	import Footer from '$lib/footer.svelte';

	const { data } = $props();

	$effect(() => {
		if (page.form?.message && 200 <= page.status && page.status <= 299) {
			setTimeout(() => {
				location.href = '/login';
			}, 3000);
		}
	});
</script>

<svelte:head>
	<title>Change Password - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="mt-10 mb-14 flex flex-col items-center justify-center">
	<div
		class="bg-opacity-70 flex w-80 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-secondary bg-white py-10"
	>
		{#if data.username || page.form?.message}
			<div class="text-center text-5xl leading-tight"><b>Change Password</b></div>
			<form use:enhance method="post" class="flex flex-col gap-6 px-5">
				<div>
					<div class="text-xl">USERNAME</div>
					<div class="h-2"></div>
					<input
						type="text"
						class="input w-full input-primary"
						disabled
						name="username"
						value={data.username}
						autocapitalize="none"
					/>
				</div>
				<div>
					<div class="text-xl">NEW PASSWORD</div>
					<div class="h-2"></div>
					<input
						type="password"
						class="input w-full input-primary"
						name="password"
						autocapitalize="none"
					/>
				</div>
				<input type="submit" class="btn btn-primary" value="Submit" />
			</form>
			{#if page.form?.message}
				<div
					class="{200 <= page.status && page.status <= 299
						? 'text-success'
						: 'text-error'} px-10 text-center font-semibold text-wrap"
				>
					{page.form?.message}
				</div>
			{/if}
		{:else}
			<div class="text-center text-5xl leading-tight text-error">Invalid Token</div>
		{/if}
	</div>
</div>

<Footer></Footer>
