export function isPointInPolygon(px: number, py: number, vertices: [x: number, y: number][]) {
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

	for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
		if (vertices[i][1] > py !== vertices[j][1] > py && px < ((vertices[j][0] - vertices[i][0]) * (py - vertices[i][1])) / (vertices[j][1] - vertices[i][1]) + vertices[i][0]) {
			isInside = !isInside;
		}
	}

	return isInside;
}
