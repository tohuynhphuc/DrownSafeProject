<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Background from "$lib/background.svelte";
	import Emptynavbar from "$lib/emptynavbar.svelte";
	import Footer from "$lib/footer.svelte";
</script>

<svelte:head>
	<title>Login - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="flex flex-col items-center justify-center mt-10 mb-14">
	<div
		class="flex flex-col items-center justify-center gap-6 border-secondary bg-white bg-opacity-70 border-2 w-[20rem] py-10 rounded-2xl"
	>
		<div class="text-5xl text-center"><b>Log In</b></div>
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
		{#if $page.form?.message}
			<div
				class="xl:col-span-2 {200 <= $page.status && $page.status <= 299
					? 'text-success'
					: 'text-error'} font-semibold py-2 text-wrap px-10 text-center"
			>
				{$page.form?.message}
			</div>
		{/if}
	</div>
</div>

<Footer></Footer>
