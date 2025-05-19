<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Emptynavbar from '$lib/emptynavbar.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<svelte:head>
	<title>Login - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="mt-10 mb-14 flex flex-col items-center justify-center">
	<div
		class="border-secondary bg-opacity-70 flex w-[20rem] flex-col items-center justify-center gap-6 rounded-2xl border-2 bg-white py-10"
	>
		<div class="text-center text-5xl"><b>Log In</b></div>
		<form use:enhance method="post" class="flex flex-col gap-6 px-5">
			<div>
				<div class="text-xl">USERNAME</div>
				<div class="h-2"></div>
				<input
					type="text"
					class="input input-primary w-full"
					name="username"
					required
					autocapitalize="none"
				/>
			</div>
			<div>
				<div class="text-xl">PASSWORD</div>
				<div class="h-2"></div>
				<input type="password" class="input input-primary w-full" name="password" required />
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<a href="/forget" class="link link-error mb-[0.15rem]"> Forgot Password</a>
				<div>Don't have an account yet?</div>
				<a href="/register" class="link link-error"> Register now</a>
			</div>
			<input type="submit" class="btn btn-primary w-full" value="Log In" />
		</form>
		{#if page.form?.message}
			<div
				class="xl:col-span-2 {200 <= page.status && page.status <= 299
					? 'text-success'
					: 'text-error'} px-10 py-2 text-center font-semibold text-wrap"
			>
				{page.form?.message}
			</div>
		{/if}
	</div>
</div>

<Footer></Footer>
