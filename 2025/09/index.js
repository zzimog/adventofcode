import { getFileLines, getEmptyMap } from '../../utils.js';
import { pointInPolygon } from './point-in-polygon.js';

const polygon = await getFileLines('./test.txt', (line) => {
  return line.split(',');
});

function getArea([x1, y1], [x2, y2]) {
  const w = Math.abs(x1 - x2) + 1;
  const h = Math.abs(y1 - y2) + 1;
  return w * h;
}

/**
 * Part 1
 */

function max() {
  const areas = [];

  for (let i = 0; i < polygon.length - 1; i++) {
    for (let j = i + 1; j < polygon.length; j++) {
      const area = getArea(polygon[i], polygon[j]);
      areas.push(area);
    }
  }

  return Math.max(...areas);
}

console.log(max());

/**
 * Part 2
 */

const testMap = getEmptyMap(20, 20, '.');

for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
    if (pointInPolygon(polygon, [x, y])) {
      testMap[y][x] = 'X';
    }
  }
}

for (const line of testMap) {
  console.log(line.join(''));
}
