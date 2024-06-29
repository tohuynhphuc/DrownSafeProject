<script lang="ts">
	import { untrack } from 'svelte';

	let latitude = $state();
	let longitude = $state();
	let altitude = $state();
	let accuracy = $state();
	let code = $state();
	let message = $state();
	let timestamp = $state();

	$effect(() =>
		untrack(() => {
			navigator.geolocation.watchPosition(
				(pos) => {
					const crd = pos.coords;

					latitude = crd.latitude;
					longitude = crd.longitude;
					altitude = crd.altitude;
					accuracy = crd.accuracy;
					timestamp = pos.timestamp;
				},
				(err) => {
					code = err.code;
					message = err.message;
				},
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				}
			);
		})
	);
</script>

console.log("Your current position is:")
<br />
console.log(Latitude : ${latitude})
<br />
console.log(Longitude: ${longitude})
<br />
console.log(Altitude: ${altitude})
<br />
console.log(More or less ${accuracy} meters.)
<br />
console.log(Timestamp: ${timestamp})
<br />
console.warn(ERROR(${code}): ${message})
<br />
