<script lang="ts">
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";

	let { data } = $props();
	let latitude = $state<number>();
	let longitude = $state<number>();
	let accuracy = $state<number>();

	$effect(() => {
		navigator.geolocation.watchPosition(
			(pos) => {
				socket.emit("gps", data.name, pos.coords.longitude, pos.coords.latitude, pos.coords.accuracy);
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
	});
</script>

<Dashboardnavbar username={data.name}></Dashboardnavbar>

<div>
	Latitude: {latitude} <br />
	Longitude: {longitude} <br />
	Accuracy: {accuracy} <br />
</div>
