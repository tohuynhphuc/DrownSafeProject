<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Navbar from '$lib/navbar.svelte';
</script>

<Navbar></Navbar>

<div class="flex flex-col items-center justify-center gap-6 mt-10">
	<div class="text-5xl">Login</div>
	<form use:enhance method="post" class="flex flex-col gap-6">
		<div>
			<div class="text-xl">USERNAME</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="username" required />
		</div>
		<div>
			<div class="text-xl">PASSWORD</div>
			<div class="h-2"></div>
			<input type="password" class="input input-primary" name="password" required />
		</div>
		<input type="submit" class="btn btn-primary w-full" value="Log In" />
	</form>
</div>

{#if $page.form?.message}
	<div class="text-error px-[1vw] py-[0.5vw] text-center text-[2vw]">
		{$page.form?.message}
	</div>
{/if}
