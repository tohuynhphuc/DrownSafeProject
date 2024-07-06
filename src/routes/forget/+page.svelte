<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Emptynavbar from "$lib/emptynavbar.svelte";
	import Footer from "$lib/footer.svelte";
</script>

<svelte:head>
	<title>Forget Password - DrownSafe</title>
</svelte:head>

<Emptynavbar></Emptynavbar>

<div class="flex flex-col items-center justify-center mt-10 mb-14">
	<div
		class="flex flex-col items-center justify-center gap-6 border-secondary bg-white bg-opacity-70 border-2 w-[20rem] xl:w-[38rem] py-10 rounded-2xl"
	>
		<div class="text-5xl text-center"><b>Change Password</b></div>
		<form use:enhance class="grid grid-cols-1 xl:grid-cols-2 gap-6" method="post">
			<div class="items-center justify-center">
				<div class="text-xl required">FULL NAME</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="name" required />
			</div>
			<div>
				<div class="text-xl required">DATE OF BIRTH</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="dob" required />
			</div>
			<div>
				<div class="text-xl required">STUDENT ID</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="studentID" required />
			</div>
			<div>
				<div class="text-xl required">EMAIL</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="email" required />
			</div>
			<div>
				<div class="text-xl required">USERNAME</div>
				<div class="h-2"></div>
				<input type="text" class="input input-primary w-full" name="username" required />
			</div>
			<div>
				<div class="text-xl required">PASSWORD</div>
				<div class="h-2"></div>
				<input type="password" class="input input-primary w-full" name="password" required />
			</div>
			<div class="xl:col-span-2 flex flex-col items-center justify-center gap-1">
				<div>Already have an account?</div>
				<a href="/login" class="link link-error"> Login here</a>
			</div>
			<div class="xl:col-span-2 flex items-center justify-center">
				<input type="submit" class="btn btn-primary w-[13.5rem]" value="Register" />
			</div>
			<!--
        <div>
            <div class="text-xl">CONFIRM PASSWORD</div>
            <div class="h-2"></div>
            <input type="password" class="input input-primary">
        </div>
        -->
		</form>
	</div>
</div>

<Footer></Footer>

{#if $page.form?.message}
	<div class="text-error px-[1vw] py-[0.5vw] text-center text-[2vw]">
		{$page.form?.message}
	</div>
{/if}

<style>
	.required:after {
		content: " *";
		color: red;
	}
</style>
