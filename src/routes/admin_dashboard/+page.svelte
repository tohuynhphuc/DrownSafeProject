<script lang="ts">
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import { LayerGroup, Map, Marker, Popup, TileLayer } from "sveaflet";

	let { data } = $props();

	socket.on("gps", (username, longtitude, latitude) => {
		const index = studentCoords.findIndex((studentCoord) => studentCoord.username == username);
		if (index !== -1) {
			studentCoords.splice(index);
		}
		studentCoords.push({ username, longtitude, latitude });
	});

	socket.emit("login", data.sessionId);

	const studentCoords: { username: string; longtitude: number; latitude: number }[] = $state([]);
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
			<LayerGroup>
				<Marker latlng={[studentCoord.latitude, studentCoord.longtitude]}>
					<Popup options={{ content: studentCoord.username }} />
				</Marker>
			</LayerGroup>
		{/each}
	</Map>
</div>
