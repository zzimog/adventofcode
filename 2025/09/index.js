import { getFileLines } from '../../utils.js';

const coords = await getFileLines('./input.txt', (line) => {
  const [col, row] = line.split(',');
  return [row, col];
});

function getArea([r1, c1], [r2, c2]) {
  const h = Math.abs(r1 - r2) + 1;
  const w = Math.abs(c1 - c2) + 1;
  return h * w;
}

/**
 * Part 1
 */

function max() {
  const areas = [];

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const area = getArea(coords[i], coords[j]);
      areas.push(area);
    }
  }

  return Math.max(...areas);
}

console.log(max());
