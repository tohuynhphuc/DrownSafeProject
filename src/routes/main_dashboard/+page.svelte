<script lang="ts">
	import Background from '$lib/background.svelte';
	import { dangerZones, markerDangerOptions, markerSafeOptions, vguBoundingBox } from '$lib/const';
	import Dashboardnavbar from '$lib/dashboardnavbar.svelte';
	import Footer from '$lib/footer.svelte';
	import { isPointInPolygon } from '$lib/functions.js';
	import type { data_schema } from '$lib/types.js';
	import { icon, Icon } from 'leaflet';
	import { pack } from 'msgpackr';
	import { LayerGroup, Map, Marker, Popup, TileLayer } from 'sveaflet';
	import { z } from 'zod/v4';

	let { data } = $props();
	let latitude = $state<number>(0);
	let longitude = $state<number>(0);
	let accuracy = $state<number>(0);
	var markerDangerIcon = $state<Icon>();
	var markerSafeIcon = $state<Icon>();
	let isDanger = $derived(
		dangerZones.some((dangerZone) => isPointInPolygon(latitude, longitude, dangerZone))
	);
	let isInSchool = $derived(
		accuracy <= 40 && isPointInPolygon(latitude, longitude, vguBoundingBox)
	);

	let ws: WebSocket;

	$effect(() => {
		ws = new WebSocket(`${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`);

		navigator.geolocation.watchPosition(
			(pos) => {
				send({
					username: data.name,
					longitude: pos.coords.longitude,
					latitude: pos.coords.latitude,
					accuracy: pos.coords.accuracy
				});

				latitude = pos.coords.latitude;
				longitude = pos.coords.longitude;
				accuracy = pos.coords.accuracy;
			},
			(err) => {
				console.log('Error: ', err);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		);

		markerDangerIcon = icon(markerDangerOptions);
		markerSafeIcon = icon(markerSafeOptions);
	});

	function send(data: z.infer<typeof data_schema>) {
		ws.send(pack(data));
	}
</script>

<svelte:head>
	<title>Main Dashboard - DrownSafe</title>
</svelte:head>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="grid grid-cols-1 justify-between xl:grid-cols-[1fr_62.91%]">
	<div class="bg-opacity-70 flex flex-col items-center gap-3 bg-white px-10 py-10 text-2xl">
		<div class="mb-7 w-full text-center text-3xl font-bold">
			Current Situation: {#if isDanger}
				<span class="animate-blink text-5xl text-error">Dangerous</span>
				<audio src="/sounds/warning.mp3" loop autoplay></audio>
			{:else if isInSchool}
				<span class="text-success">Safe</span>
			{:else}
				<span class="text-warning">Unknown</span>
			{/if}
		</div>
		<div
			class="flex w-full max-w-120 flex-col items-center justify-start rounded-3xl bg-red-100 p-6 xl:flex-row xl:justify-between"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/latitude.webp" alt="" class="inline size-10" />
				Latitude
			</div>
			<div>{latitude.toFixed(4)}</div>
		</div>

		<div
			class="flex w-full max-w-120 flex-col items-center justify-start rounded-3xl bg-yellow-100 p-6 xl:flex-row xl:justify-between"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/latitude.webp" alt="" class="inline size-10" />
				Longitude
			</div>
			<div>{longitude.toFixed(4)}</div>
		</div>

		<div
			class="flex w-full max-w-120 flex-col items-center justify-start rounded-3xl bg-green-100 p-6 xl:flex-row xl:justify-between"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/accuracy.webp" alt="" class="inline size-10" />
				Accuracy
			</div>
			<div>{accuracy.toFixed(2)}m</div>
		</div>
	</div>
	<div class="z-0 h-150 shadow-2xl">
		<Map
			options={{
				center: [11.107737, 106.615169],
				zoom: window.screen.width < 1280 ? 16 : 17
			}}
		>
			<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.webp'} />
			{#if isInSchool}
				<LayerGroup>
					{#if isDanger}
						<Marker
							latLng={[latitude, longitude]}
							options={{
								icon: markerDangerIcon
							}}
						>
							<Popup options={{ content: data.name }} />
						</Marker>
					{:else}
						<Marker
							latLng={[latitude, longitude]}
							options={{
								icon: markerSafeIcon
							}}
						>
							<Popup options={{ content: data.name }} />
						</Marker>
					{/if}
				</LayerGroup>
			{/if}
		</Map>
	</div>
</div>

<Footer></Footer>
