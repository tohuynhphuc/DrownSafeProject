<script>
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";

	let { data } = $props();

	$effect(() => {
		navigator.geolocation.watchPosition(
			(pos) => {
				socket.emit("gps", data.username, pos.coords.longitude, pos.coords.latitude);
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

<Dashboardnavbar username={data.username}></Dashboardnavbar>
