<script lang="ts">
	import { enhance } from '$app/forms';

	let { username }: { username: string } = $props();
</script>

<div class="grid grid-cols-[5rem_1fr_1fr_1fr] items-center justify-center text-center gap-1 text-[30px] text-white">
	<div class="bg-secondary h-20 flex items-center justify-center">
		<img src="/favicon.png" alt="kệ đi" class="size-20" />
	</div>
	<a href="/" class="bg-secondary h-20 flex items-center justify-center hover:bg-red-500">
		<div>HOME</div>
	</a>
	<a href="/water_safety_information/" class="bg-secondary h-20 flex items-center justify-center hover:bg-yellow-500">
		<div>WATER SAFETY INFORMATION</div>
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
