<script lang="ts">
	import { dangerZones, fake_dangerZones, markerDangerOptions, markerSafeOptions, socket, vguBoundingBox } from "$lib/const";
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

		if ((riverOption === "fakeRiver" ? fake_dangerZones : dangerZones).some((dangerZone) => isPointInPolygon(latitude, longtitude, dangerZone))) {
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

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="grid grid-cols-[1fr_62.91%] justify-between m-1 gap-1">
	<div class="text-2xl pl-2">
		<div class="flex flex-col items-center justify-center">
			<select bind:value={riverOption} class="select select-primary">
				<option value="realRiver">Real</option>
				<option value="fakeRiver">fAkE</option>
			</select>
		</div>
		<div class="text-4xl w-full">Students In Danger Zone:</div>
		<ul class="pl-10 mt-5 leading-relaxed list-['>__']">
			{#if dangerStudents.length === 0}
				<li>None...</li>
			{:else}
				{#each dangerStudents as student}
					<li>{student}</li>
				{/each}
			{/if}
		</ul>
	</div>
	<div class="h-[600px]">
		<Map
			options={{
				center: [11.108004, 106.615491],
				zoom: 16
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
