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
<Dashboardnavbar username={data.name}></Dashboardnavbar>

<div class="">
	Latitude: {latitude} <br />
	Longitude: {longitude} <br />
	Accuracy: {accuracy} <br />
</div>

<div class="grid grid-cols-[1fr_62.91%] justify-between m-1 gap-1">
	<div class="text-2xl pl-2">
		<div class="text-4xl w-full">Students In Danger Zone:</div>
	</div>
	<div class="h-[600px] -z-10">
		<Map
			options={{
				center: [11.107737, 106.615169],
				zoom: 17
			}}
		>
			<TileLayer urlTemplate={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"} />
			<LayerGroup>
				{#if isInSchool}
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
				{/if}
			</LayerGroup>
		</Map>
	</div>
</div>

<Footer></Footer>
