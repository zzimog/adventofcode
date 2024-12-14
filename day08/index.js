import { join } from 'node:path';
import { getFileLines, getMapSize } from '../utils.js';
import Point from './Point.js';
import count1 from './count1.js';
import count2 from './count2.js';

const input = join(import.meta.dirname, './input.txt');

const antennas = [];
const map = await getFileLines(input, (line, row) => {
  const lineArray = line.split('');

  for (let col in lineArray) {
    const char = lineArray[col];

    if (char != '.') {
      antennas.push(new Point(row, Number(col), char));
    }
  }

  return lineArray;
});
const [ROWS, COLS] = getMapSize(map);

const c1 = count1(map, ROWS, COLS, antennas);
const c2 = count2(map, ROWS, COLS, antennas);

console.log('Part 1, count: %d', c1);
console.log('Part 2, count: %d', c2);
