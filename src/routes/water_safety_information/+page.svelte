<script>
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";

	let { data } = $props();
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="grid grid-cols-[1fr_3fr] gap-6">
	<div>
		<img />
		<div></div>
	</div>
</div>
