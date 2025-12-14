<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Emptynavbar from '$lib/emptynavbar.svelte';
	import Footer from '$lib/footer.svelte';

	let submitted = $state(false);
</script>

<svelte:head>
	<title>Forget Password - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="mt-10 mb-14 flex flex-col items-center justify-center">
	<div
		class="bg-opacity-70 flex w-80 flex-col items-center justify-center gap-6 rounded-2xl border-2 border-secondary bg-white py-10"
	>
		<div class="text-center text-5xl leading-tight"><b>Forget Password</b></div>
		<form
			use:enhance
			method="post"
			class="flex flex-col gap-6 px-5"
			onsubmit={() => {
				submitted = true;
			}}
		>
			<div>
				<div class="required text-xl">USERNAME or EMAIL</div>
				<div class="h-2"></div>
				<input
					type="text"
					class="input w-full input-primary"
					name="username_or_email"
					autocapitalize="none"
					required
				/>
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<div>Already have an account?</div>
				<a href="/login" class="mb-1 link link-error"> Login here</a>
				<div>Don't have an account yet?</div>
				<a href="/register" class="link link-error"> Register now</a>
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
		{:else if submitted}
			<div class="text-center font-semibold text-wrap text-warning">
				Please wait while we process your request...
			</div>
		{/if}
	</div>
</div>

<Footer></Footer>
