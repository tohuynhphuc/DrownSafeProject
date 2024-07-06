<script lang="ts">
	import { enhance } from "$app/forms";
	let { username }: { username: string | undefined } = $props();
</script>

<div class="text-xl py-7 px-5 bg-blue-100 xl:px-20 z-50 bg-opacity-100">
	<div class="flex flex-row justify-between items-center">
		<a href="/" class="flex flex-row items-center gap-2">
			<img src="favicon.png" alt="Icon" class="size-10" />
			<div><b>DROWNSAFE</b></div>
		</a>
		{#if username}
			<div class="flex flex-col items-end">
				<div class="peer">
					<div
						class="flex flex-row items-end justify-center gap-3 py-2 px-6 border-2 border-red-500 shadow-xl rounded-2xl bg-blue-300 hover:bg-blue-400"
					>
						Hello {username}
						<img src="down.png" alt="" class="size-3 mb-[0.36rem]" />
					</div>
				</div>
				<div class="peer-hover:block hidden absolute hover:block mt-12">
					<div class="flex flex-col gap-2 shadow-xl p-2 rounded-2xl bg-blue-50">
						<div class="p-2 hover:bg-red-100 rounded-2xl">
							<a href="/login">Dashboard</a>
						</div>
						<div class="p-2 hover:bg-yellow-100 rounded-2xl">
							<a href="/water_safety_information">Water Safety Information</a>
						</div>
						<div class="p-2 hover:bg-green-100 rounded-2xl">
							<form class="inline" use:enhance method="post" action="?/logout">
								<input type="submit" value="Log Out" />
							</form>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex gap-1 items-center xl:gap-10">
				<a href="/register">Sign Up</a>
				<a
					href="/login"
					class="btn text-xl bg-customblue text-white w-24 h-16 rounded-3xl hover:bg-custombluedark xl:w-44"
					>Log in</a
				>
			</div>
		{/if}
	</div>
</div>

<!--
<div class="grid grid-cols-[5rem_1fr_1fr_1fr_1fr] items-center justify-center text-center gap-1 text-2xl text-white">
	<div class="bg-secondary h-20 flex items-center justify-center">
		<img src="/favicon.png" alt="kệ đi" class="size-20" />
	</div>
	<a href="/" class="bg-secondary h-20 flex items-center justify-center hover:bg-red-500">
		<div>HOME</div>
	</a>
	<a href="/login/" class="bg-secondary h-20 flex items-center justify-center hover:bg-blue-500">
		<div>DASHBOARD</div>
	</a>
	<a href="/water_safety_information/" class="bg-secondary h-20 flex items-center justify-center hover:bg-yellow-500">
		<div>WATER SAFETY INFO</div>
	</a>
	<div class="bg-secondary h-20 flex items-center justify-center hover:bg-green-500">
		<div>
			Hello {username} (
			<form class="inline" use:enhance method="post" action="?/logout">
				<input type="submit" value="Log Out" class="link link-info" />
			</form>
			)
		</div>
	</div>
</div>
-->
