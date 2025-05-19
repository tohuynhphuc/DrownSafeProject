<script lang="ts">
	import Background from '$lib/background.svelte';
	import {
		dangerZones,
		fake_dangerZones,
		markerDangerOptions,
		markerSafeOptions,
		socket,
		vguBoundingBox
	} from '$lib/const';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';
	import { isPointInPolygon } from '$lib/functions.js';
	import { icon, Icon } from 'leaflet';
	import { LayerGroup, Map, Marker, Popup, TileLayer } from 'sveaflet';

	let { data } = $props();
	let riverOption = $state<'fakeRiver' | 'realRiver'>();

	var markerDangerIcon = $state<Icon>();
	var markerSafeIcon = $state<Icon>();

	const dangerStudents: string[] = $state([]);

	$effect(() => {
		markerDangerIcon = icon(markerDangerOptions);
		markerSafeIcon = icon(markerSafeOptions);
	});

	socket.on('gps', (username, longtitude, latitude, accuracy) => {
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
			(riverOption === 'fakeRiver' ? fake_dangerZones : dangerZones).some((dangerZone) =>
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

	socket.emit('login', data.sessionId);

	const studentCoords: { username: string; longtitude: number; latitude: number }[] = $state([]);
</script>

<svelte:head>
	<title>Admin Dashboard - DrownSafe</title>
</svelte:head>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="grid grid-cols-1 justify-between xl:grid-cols-[1fr_62.91%]">
	<div class="bg-opacity-70 flex flex-col items-center gap-3 bg-white px-10 py-10 text-2xl">
		<!-- <div class="flex flex-col items-center justify-center">
			<select bind:value={riverOption} class="select select-primary">
				<option value="realRiver">Real</option>
				<option value="fakeRiver">fAkE</option>
			</select>
			</div> -->
		{#if dangerStudents.length === 0}
			<div class="text-success w-full text-center text-3xl font-bold">
				There are no Students in danger
			</div>
		{:else}
			<div class="text-error animate-blink w-full text-center text-6xl font-bold">
				STUDENTS ARE IN DANGER
			</div>
			<audio src="/sounds/warning.mp3" loop autoplay></audio>
			<ul class="mt-5 list-['>_'] pl-10 leading-relaxed">
				{#each dangerStudents as student}
					<li class="text-error text-5xl">{student}</li>
				{/each}
			</ul>
		{/if}
	</div>
	<div class="z-0 h-[600px] shadow-2xl">
		<Map
			options={{
				center: [11.107737, 106.615169],
				zoom: window.screen.width < 1280 ? 16 : 17
			}}
		>
			<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
			{#each studentCoords as studentCoord}
				<LayerGroup>
					{#if dangerStudents.includes(studentCoord.username)}
						<Marker
							latLng={[studentCoord.latitude, studentCoord.longtitude]}
							options={{
								icon: markerDangerIcon
							}}
						>
							<Popup options={{ content: studentCoord.username }} />
						</Marker>
					{:else}
						<Marker
							latLng={[studentCoord.latitude, studentCoord.longtitude]}
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

<Footer></Footer>
