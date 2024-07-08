<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Background from "$lib/background.svelte";
	import Emptynavbar from "$lib/emptynavbar.svelte";
	import Footer from "$lib/footer.svelte";
	import { untrack } from "svelte";

	let { data } = $props();

	$effect(() => {
		$page.form?.message;
		$page.status;
		untrack(() => {
			if (200 <= $page.status && $page.status <= 299) {
				setTimeout(() => {
					location.href = "/login";
				}, 3000);
			}
		});
	});
</script>

<svelte:head>
	<title>Change Password - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="flex flex-col items-center justify-center mt-10 mb-14">
	<div
		class="flex flex-col items-center justify-center gap-6 border-secondary bg-white bg-opacity-70 border-2 w-[20rem] py-10 rounded-2xl"
	>
		{#if data.username}
			<div class="text-5xl text-center leading-tight"><b>Change Password</b></div>
			<form use:enhance method="post" class="flex flex-col gap-6 px-5">
				<div>
					<div class="text-xl">USERNAME</div>
					<div class="h-2"></div>
					<input
						type="text"
						class="input input-primary w-full"
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
						class="input input-primary w-full"
						name="password"
						autocapitalize="none"
					/>
				</div>
				<input type="submit" class="btn btn-primary" value="Submit" />
			</form>
			{#if $page.form?.message}
				<div
					class="{200 <= $page.status && $page.status <= 299
						? 'text-success'
						: 'text-error'} px-10 text-center text-wrap font-semibold"
				>
					{$page.form?.message}
				</div>
			{/if}
		{:else}
			<div class="text-5xl text-center text-error leading-tight">Invalid Token</div>
		{/if}
	</div>
</div>

<Footer></Footer>
