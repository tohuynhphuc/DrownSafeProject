<script lang="ts">
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import { LayerGroup, Map, Marker, Popup, TileLayer } from "sveaflet";

	let { data } = $props();

	const vguBoundingBox: [number, number][] = [
		[11.1107, 106.62],
		[11.1107, 106.6103],
		[11.1043, 106.6103],
		[11.1043, 106.62]
	];
	/*
	const riverBoundingBox: [number, number][] = [
		[11.109436, 106.612503],
		[11.109127, 106.612619],
		[11.108832, 106.612999],
		[11.108767, 106.61321],
		[11.108767, 106.613445],
		[11.109451, 106.612497],
		[11.109264, 106.612541],
		[11.109128, 106.612622],
		[11.108984, 106.612764],
		[11.108882, 106.612897],
		[11.108823, 106.613022],
		[11.108769, 106.6132],
		[11.108759, 106.61331],
		[11.108759, 106.613384],
		[11.108766, 106.613444],
		[11.109977, 106.616817],
		[11.110492, 106.618281],
		[11.110597, 106.618467],
		[11.110599, 106.618471],
		[11.110631, 106.618516],
		[11.110251, 106.61869],
		[11.110239, 106.618624],
		[11.11024, 106.61855],
		[11.11022, 106.618452],
		[11.11003, 106.61809],
		[11.109234, 106.615846],
		[11.109292, 106.616012],
		[11.109229, 106.615797],
		[11.109137, 106.615576],
		[11.109098, 106.615462],
		[11.109074, 106.615405],
		[11.109056, 106.615363],
		[11.109013, 106.615217],
		[11.109004, 106.615188],
		[11.108948, 106.615041],
		[11.108897, 106.614911],
		[11.10884, 106.614762],
		[11.108774, 106.614577],
		[11.10872, 106.614437],
		[11.108678, 106.614322],
		[11.108645, 106.614208],
		[11.108601, 106.614071],
		[11.108545, 106.613872],
		[11.108507, 106.613741],
		[11.10848, 106.613649],
		[11.108454, 106.613219],
		[11.108502, 106.612959],
		[11.108599, 106.612735],
		[11.108855, 106.612416],
		[11.108957, 106.612333],
		[11.109132, 106.612265],
		[11.109168, 106.61225],
		[11.109195, 106.612236],
		[11.109235, 106.612219],
		[11.109256, 106.612209],
		[11.109331, 106.612171]
	];
*/
	const riverBoundingBox: [number, number][] = vguBoundingBox;

	const dangerZones: [number, number][][] = [riverBoundingBox];
	const dangerStudents: string[] = $state([]);

	console.log("Checking: ", isPointInPolygon(11.108495, 106.613061, riverBoundingBox));

	socket.on("gps", (username, longtitude, latitude, accuracy) => {
		const index = studentCoords.findIndex((studentCoord) => studentCoord.username == username);
		if (accuracy > 40) {
			return;
		}

		//if (!(latitude <= 11.1107 && latitude >= 11.1043 && longtitude <= 106.62 && longtitude >= 106.6103)) {
		if (!isPointInPolygon(latitude, longtitude, vguBoundingBox)) {
			return;
		}

		if (index !== -1) {
			studentCoords.splice(index);
		}

		studentCoords.push({ username, latitude, longtitude });
		if (dangerZones.some((dangerZone) => isPointInPolygon(latitude, longtitude, dangerZone))) {
			dangerStudents.push(username);
		}
	});

	socket.emit("login", data.sessionId);

	console.log(dangerStudents);

	const studentCoords: { username: string; longtitude: number; latitude: number }[] = $state([]);

	function isPointInPolygon(px: number, py: number, vertices: [x: number, y: number][]) {
		let isInside = false;
		let minX = vertices[0][0],
			maxX = vertices[0][0];
		let minY = vertices[0][1],
			maxY = vertices[0][1];

		for (let i = 1; i < vertices.length; i++) {
			const q = vertices[i];
			minX = Math.min(q[0], minX);
			maxX = Math.max(q[0], maxX);
			minY = Math.min(q[1], minY);
			maxY = Math.max(q[1], maxY);
		}

		if (px < minX || px > maxX || py < minY || py > maxY) {
			return false;
		}

		let i = 0,
			j = vertices.length - 1;
		for (; i < vertices.length; j = i++) {
			if (vertices[i][1] > py !== vertices[j][1] > py && px < ((vertices[j][0] - vertices[i][0]) * (py - vertices[i][1])) / (vertices[j][1] - vertices[i][1]) + vertices[i][0]) {
				isInside = !isInside;
			}
		}

		return isInside;
	}
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

<div class="flex flex-row">
	<div>
		{#each dangerStudents as student}
			<div>{student} entered the danger zone</div>
		{/each}
	</div>
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
</div>
