import { join } from 'node:path';
import { getFileLines } from '../utils.js';
import getRegions from './getRegions.js';

const input = join(import.meta.dirname, './test.txt');
const garden = await getFileLines(input, (l) => l.split(''));
const regions = getRegions(garden);

/**
 * Part 1
 */

// expected for test.txt -> 1930
const sum1 = regions.reduce((sum, region) => {
  const A = region.plants.length;
  const P = region.plants.reduce((p, plant) => {
    return (p += plant.perimeter);
  }, 0);
  return (sum += A * P);
}, 0);

console.log('Part 1, sum: %d', sum1);

/**
 * Part 2
 */

// expected for test.txt -> 1206
const sum2 = 0;
regions[0].plants.forEach((plant) => {
  let matrix = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  plant.adj.forEach(([dR, dC]) => (matrix[1 + dR][1 + dC] = 1));
  plant.diag.forEach(([dR, dC]) => (matrix[1 + dR][1 + dC] = 1));

  console.table(matrix);
});
