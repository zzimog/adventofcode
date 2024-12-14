import { join } from 'node:path';
import { getFileLines } from '../utils.js';
import { walkArea, possibleObstacles } from './walk.js';

const input = join(import.meta.dirname, './input.txt');

const map = await getFileLines(input, (l) => l.split(''));
const area = walkArea(map);
const obstacles = possibleObstacles(map).length;

console.log('Covered area: %d', area);
console.log('Obstacles possible positions:', obstacles);
