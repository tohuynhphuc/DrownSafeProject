<script lang="ts">
	import { socket } from "$lib/const";
	import Dashboardnavbar from "$lib/dashboardnavbar.svelte";
	import { LayerGroup, Map, Marker, Popup, TileLayer } from "sveaflet";

	let { data } = $props();
	console.log(
		"Check point: ",
		isPointInPolygon(11.109765, 106.615612, [
			[11.108774, 106.613467],
			[11.110589, 106.618531],
			[11.110244, 106.61865],
			[11.108448, 106.613621]
		])
	);
	socket.on("gps", (username, longtitude, latitude, accuracy) => {
		const index = studentCoords.findIndex((studentCoord) => studentCoord.username == username);
		if (accuracy > 40) {
			return;
		}

		//if (!(latitude <= 11.1107 && latitude >= 11.1043 && longtitude <= 106.62 && longtitude >= 106.6103)) {
		if (!isPointInRectangle(latitude, longtitude, { x: 11.1107, y: 106.62 }, { x: 11.1107, y: 106.6103 }, { x: 11.1043, y: 106.62 })) {
			return;
		}

		if (index !== -1) {
			studentCoords.splice(index);
		}
		studentCoords.push({ username, longtitude, latitude });
	});

	socket.emit("login", data.sessionId);

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

	// Function to calculate the area of a triangle given its vertices
	function triangleArea(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
		return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
	}

	// Function to check if a point (x, y) is inside the parallelogram
	function isPointInQuadrilateral(x: number, y: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
		x -= 11;
		x1 -= 11;
		x2 -= 11;
		x3 -= 11;
		x4 -= 11;
		y -= 106;
		y1 -= 106;
		y2 -= 106;
		y3 -= 106;
		y4 -= 106;
		// Calculate the area of the parallelogram using two triangles
		let parallelogramArea = triangleArea(x1, y1, x2, y2, x3, y3) + triangleArea(x1, y1, x3, y3, x4, y4);

		// Calculate the areas of the triangles formed by the point and each pair of vertices
		let area1 = triangleArea(x, y, x1, y1, x2, y2);
		let area2 = triangleArea(x, y, x2, y2, x3, y3);
		let area3 = triangleArea(x, y, x3, y3, x4, y4);
		let area4 = triangleArea(x, y, x4, y4, x1, y1);
		console.log("Quad Area = ", parallelogramArea);
		console.log("Sum Area = ", area1 + area2 + area3 + area4);
		// If the sum of the areas of the four triangles is equal to the area of the parallelogram, the point is inside
		return Math.abs(parallelogramArea - (area1 + area2 + area3 + area4)) < Number.EPSILON;
	}

	function isPointInRectangle(px: number, py: number, A: { x: number; y: number }, B: { x: number; y: number }, D: { x: number; y: number }) {
		function vector(x1: number, y1: number, x2: number, y2: number) {
			return { x: x2 - x1, y: y2 - y1 };
		}

		function dotProduct(v1: { x: number; y: number }, v2: { x: number; y: number }) {
			return v1.x * v2.x + v1.y * v2.y;
		}

		// Vectors
		const AB = vector(A.x, A.y, B.x, B.y);
		const AD = vector(A.x, A.y, D.x, D.y);
		const AP = vector(A.x, A.y, px, py);

		// Dot products
		const AB_AB = dotProduct(AB, AB);
		const AB_AP = dotProduct(AB, AP);
		const AD_AD = dotProduct(AD, AD);
		const AD_AP = dotProduct(AD, AP);

		// Check if point is within the rectangle
		return 0 <= AB_AP && AB_AP <= AB_AB && 0 <= AD_AP && AD_AP <= AD_AD;
	}
</script>

<Dashboardnavbar username={data.username}></Dashboardnavbar>

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
