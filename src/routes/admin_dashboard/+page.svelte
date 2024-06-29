<script lang="ts">
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import { Map, Marker, TileLayer } from "sveaflet";

	let { data } = $props();

	socket.on("gps", (longtitude, latitude) => {
		studentCoords.push({ longtitude, latitude });
	});

	socket.emit("login", data.sessionId);

	const studentCoords: { longtitude: number; latitude: number }[] = $state([]);
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="w-[900px] h-[600px]">
	<Map
		options={{
			center: [11.108004, 106.615491],
			zoom: 16
		}}
	>
		<TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
		{#each studentCoords as studentCoord}
			<Marker latlng={[studentCoord.latitude, studentCoord.longtitude]} />
		{/each}
	</Map>
</div>
