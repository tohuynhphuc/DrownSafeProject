<script lang="ts">
	import {
		dangerZones,
		fake_dangerZones,
		markerDangerOptions,
		markerSafeOptions,
		socket,
		vguBoundingBox
	} from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import { isPointInPolygon } from "$lib/functions.js";
	import { icon, Icon } from "leaflet";
	import { LayerGroup, Map, Marker, Popup, TileLayer } from "sveaflet";

	let { data } = $props();
	let riverOption = $state<"fakeRiver" | "realRiver">();

	var markerDangerIcon = $state<Icon>();
	var markerSafeIcon = $state<Icon>();

	const dangerStudents: string[] = $state([]);

	$effect(() => {
		markerDangerIcon = icon(markerDangerOptions);
		markerSafeIcon = icon(markerSafeOptions);
	});

	socket.on("gps", (username, longtitude, latitude, accuracy) => {
		const index = studentCoords.findIndex((studentCoord) => studentCoord.username == username);
		if (accuracy > 40) {
			return;
		}

		if (!isPointInPolygon(latitude, longtitude, vguBoundingBox)) {
			return;
		}

		if (index !== -1) {
			studentCoords.splice(index, 1);
		}

		studentCoords.push({ username, latitude, longtitude });

		if (
			(riverOption === "fakeRiver" ? fake_dangerZones : dangerZones).some((dangerZone) =>
				isPointInPolygon(latitude, longtitude, dangerZone)
			)
		) {
			if (!dangerStudents.includes(username)) {
				dangerStudents.push(username);
			}
		} else {
			const index = dangerStudents.indexOf(username);
			if (index != -1) {
				dangerStudents.splice(index, 1);
			}
		}
		console.log(dangerStudents);
	});

	socket.emit("login", data.sessionId);

	const studentCoords: { username: string; longtitude: number; latitude: number }[] = $state([]);
</script>

<svelte:head>
	<title>Guard Dashboard - DrownSafe</title>
</svelte:head>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="grid grid-cols-[1fr_62.91%] justify-between m-1 gap-1">
	<div class="text-2xl pl-2">
		<div class="flex flex-col items-center justify-center">
			<select bind:value={riverOption} class="select select-primary">
				<option value="realRiver">Real</option>
				<option value="fakeRiver">fAkE</option>
			</select>
		</div>
		{#if dangerStudents.length > 0}
			<div class="text-red-600 text-7xl w-full">There are Students In Danger Zone</div>
		{/if}
	</div>
	<div class="h-[600px] -z-10">
		<Map
			options={{
				center: [11.107737, 106.615169],
				zoom: 17
			}}
		>
			<TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
			{#each studentCoords as studentCoord}
				<LayerGroup>
					{#if dangerStudents.includes(studentCoord.username)}
						<Marker
							latlng={[studentCoord.latitude, studentCoord.longtitude]}
							options={{
								icon: markerDangerIcon
							}}
						>
							<Popup options={{ content: studentCoord.username }} />
						</Marker>
					{:else}
						<Marker
							latlng={[studentCoord.latitude, studentCoord.longtitude]}
							options={{
								icon: markerSafeIcon
							}}
						>
							<Popup options={{ content: studentCoord.username }} />
						</Marker>
					{/if}
				</LayerGroup>
			{/each}
		</Map>
	</div>
</div>
