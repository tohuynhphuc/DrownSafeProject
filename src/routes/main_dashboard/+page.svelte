<script>
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';

	let { data } = $props();
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>
