<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Background from '$lib/background.svelte';
	import Emptynavbar from '$lib/emptynavbar.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<svelte:head>
	<title>Register - DrownSafe</title>
</svelte:head>

<Background></Background>
<Emptynavbar></Emptynavbar>

<div class="mt-10 mb-14 flex flex-col items-center justify-center">
	<div
		class="border-secondary bg-opacity-70 flex w-[20rem] flex-col items-center justify-center gap-6 rounded-2xl border-2 bg-white py-10 xl:w-[38rem]"
	>
		<div class="text-center text-5xl"><b>Create New Account</b></div>
		<form use:enhance class="grid grid-cols-1 gap-6 xl:grid-cols-2" method="post">
			<div class="items-center justify-center">
				<div class="required text-xl">FULL NAME</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="name" required />
			</div>
			<div>
				<div class="required text-xl">DATE OF BIRTH</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="dob" required />
			</div>
			<div>
				<div class="required text-xl">STUDENT ID</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="studentID" required />
			</div>
			<div>
				<div class="required text-xl">EMAIL</div>
				<div class="h-2"></div>
				<input type="email" class="input input-primary w-full" name="email" required />
			</div>
			<div>
				<div class="required text-xl">USERNAME</div>
				<div class="h-2"></div>
				<input
					type="text"
					class="input input-primary w-full"
					name="username"
					autocapitalize="none"
					required
				/>
			</div>
			<div>
				<div class="required text-xl">PASSWORD</div>
				<div class="h-2"></div>
				<input type="password" class="input input-primary w-full" name="password" required />
			</div>
			<div class="flex flex-col items-center justify-center gap-1 xl:col-span-2">
				<div>Already have an account?</div>
				<a href="/login" class="link link-error"> Log In here</a>
			</div>
			<div class="flex items-center justify-center xl:col-span-2">
				<input type="submit" class="btn btn-primary w-[13.5rem]" value="Register" />
			</div>
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
