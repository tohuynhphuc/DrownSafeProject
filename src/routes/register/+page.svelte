<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Navbar from "$lib/navbar.svelte";
</script>

<Navbar></Navbar>

<div class="flex flex-col items-center justify-center gap-6 mt-10">
	<div class="text-5xl">Create New Account</div>
	<form use:enhance class="grid grid-cols-2 gap-6" method="post">
		<div>
			<div class="text-xl required">FULL NAME</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="name" required />
		</div>
		<div>
			<div class="text-xl required">DATE OF BIRTH</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="dob" required />
		</div>
		<div>
			<div class="text-xl required">STUDENT ID</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="studentID" required />
		</div>
		<div>
			<div class="text-xl required">EMAIL</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="email" required />
		</div>
		<div>
			<div class="text-xl required">USERNAME</div>
			<div class="h-2"></div>
			<input type="text" class="input input-primary" name="username" required />
		</div>
		<div>
			<div class="text-xl required">PASSWORD</div>
			<div class="h-2"></div>
			<input type="password" class="input input-primary" name="password" required />
		</div>
		<div class="col-span-2 flex items-center justify-center">
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
