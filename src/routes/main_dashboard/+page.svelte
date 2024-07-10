<script lang="ts">
	import Background from "$lib/background.svelte";
	import {
		dangerZones,
		markerDangerOptions,
		markerSafeOptions,
		socket,
		vguBoundingBox
	} from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import Footer from "$lib/footer.svelte";
	import { isPointInPolygon } from "$lib/functions.js";
	import { icon, Icon } from "leaflet";
	import { LayerGroup, Map, Marker, Popup, TileLayer } from "sveaflet";

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

	$effect(() => {
		navigator.geolocation.watchPosition(
			(pos) => {
				socket.emit(
					"gps",
					data.name,
					pos.coords.longitude,
					pos.coords.latitude,
					pos.coords.accuracy
				);
				latitude = pos.coords.latitude;
				longitude = pos.coords.longitude;
				accuracy = pos.coords.accuracy;
				console.log(pos.coords.accuracy);
			},
			(err) => {
				console.log("Error: ", err);
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
</script>

<svelte:head>
	<title>Main Dashboard - DrownSafe</title>
</svelte:head>

<Background></Background>
<Dashboardnavbar username={data.username} name={data.name}></Dashboardnavbar>

<div class="grid grid-cols-1 xl:grid-cols-[1fr_62.91%] justify-between">
	<div class="flex flex-col items-center text-2xl px-10 gap-3 bg-white bg-opacity-70 py-10">
		<div class="text-3xl w-full font-bold text-center mb-7">
			Current Situation: {#if isDanger}
				<span class="text-5xl text-error animate-blink">Dangerous</span>
				<audio src="/sounds/warning.mp3" loop autoplay></audio>
			{:else if isInSchool}
				<span class="text-success">Safe</span>
			{:else}
				<span class="text-warning">Unknown</span>
			{/if}
		</div>
		<div
			class="flex flex-col xl:flex-row items-center justify-start xl:justify-between max-w-[30rem] w-full bg-red-100 rounded-3xl p-6"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/latitude.png" alt="" class="inline size-10" />
				Latitude
			</div>
			<div>{latitude.toFixed(4)}</div>
		</div>

		<div
			class="flex flex-col xl:flex-row items-center justify-start xl:justify-between max-w-[30rem] w-full bg-yellow-100 rounded-3xl p-6"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/latitude.png" alt="" class="inline size-10" />
				Longitude
			</div>
			<div>{longitude.toFixed(4)}</div>
		</div>

		<div
			class="flex flex-col xl:flex-row items-center justify-start xl:justify-between max-w-[30rem] w-full bg-green-100 rounded-3xl p-6"
		>
			<div class="flex flex-row items-center gap-3 font-semibold">
				<img src="/accuracy.png" alt="" class="inline size-10" />
				Accuracy
			</div>
			<div>{accuracy.toFixed(2)}m</div>
		</div>
	</div>
	<div class="h-[600px] z-0 shadow-2xl">
		<Map
			options={{
				center: [11.107737, 106.615169],
				zoom: window.screen.width < 1280 ? 16 : 17
			}}
		>
			<TileLayer url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
			{#if isInSchool}
				<LayerGroup>
					{#if isDanger}
						<Marker
							latlng={[latitude, longitude]}
							options={{
								icon: markerDangerIcon
							}}
						>
							<Popup options={{ content: data.name }} />
						</Marker>
					{:else}
						<Marker
							latlng={[latitude, longitude]}
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
