<script>
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';

	let { data } = $props();
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="flex flex-col items-center justify-center">
	<div class="flex w-full h-32 gap-10">Drowning Statistics for 2023</div>
	<div>First Aid Basics</div>
	<div>Life-Saving Tips Everyone Should Know to Prevent Drowning</div>
</div>
