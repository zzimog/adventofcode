import { join } from 'node:path';
import { getFileLines } from '../utils.js';
import getRegions from './getRegions.js';

const input = join(import.meta.dirname, './input.txt');
const garden = await getFileLines(input, (l) => l.split(''));
const regions = getRegions(garden);

/**
 * Part 1
 */

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

const sum2 = regions.reduce((sum, region) => {
  const A = region.plants.length;
  const P = region.plants.reduce((sum, plant) => {
    return (sum += plant.corners);
  }, 0);

  return (sum += A * P);
}, 0);

console.log('Part 2, sum: %d', sum2);
