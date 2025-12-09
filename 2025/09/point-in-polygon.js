export function pointInPolygon(polygon, [xp, yp]) {
  let count = 0;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    if (yp > Math.min(yi, yj) && yp < Math.max(yi, yj)) {
      count++;
      continue;
    }

    if (xp === xi) {
      //
    }
  }

  return count % 2 !== 0;
}
