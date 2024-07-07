<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Background from "$lib/background.svelte";
	import Emptynavbar from "$lib/emptynavbar.svelte";
	import Footer from "$lib/footer.svelte";
</script>

<svelte:head>
	<title>Forget Password - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="flex flex-col items-center justify-center mt-10 mb-14">
	<div
		class="flex flex-col items-center justify-center gap-6 border-secondary bg-white bg-opacity-70 border-2 w-[20rem] py-10 rounded-2xl"
	>
		<div class="text-5xl text-center leading-tight"><b>Forget Password</b></div>
		<form use:enhance method="post" class="flex flex-col gap-6 px-5">
			<div>
				<div class="text-xl">USERNAME</div>
				<div class="h-2"></div>
				<input
					type="text"
					class="input input-primary w-full"
					name="username"
					autocapitalize="none"
				/>
			</div>
			<div>
				<div class="text-xl">EMAIL</div>
				<div class="h-2"></div>
				<input type="email" class="input input-primary w-full" name="email" autocapitalize="none" />
			</div>
			<div class="flex flex-col items-center justify-center gap-1">
				<div>Already have an account?</div>
				<a href="/login" class="link link-error mb-1"> Login here</a>
				<div>Don't have an account yet?</div>
				<a href="/register" class="link link-error"> Register now</a>
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
	</div>
</div>

<Footer></Footer>
