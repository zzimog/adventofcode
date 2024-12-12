import { join } from 'node:path';
import {
  cloneMap,
  Directions,
  getFileLines,
  getMapSize,
  isInBound,
} from '../utils.js';
import Plant from './Plant.js';

const input = join(import.meta.dirname, './test.txt');
const garden = await getFileLines(input, (l) => l.split(''));

const [ROWS, COLS] = getMapSize(garden);
const isValidPos = (row, col) => {
  return isInBound(row, ROWS) && isInBound(col, COLS);
};

/**
 * Part 1
 */

const visited = cloneMap(garden);
const plants = [];
let price = 0;

for (const i in garden) {
  for (const j in garden[i]) {
    let row = Number(i);
    let col = Number(j);
    let char = garden[row][col];
    let plant = new Plant(char, row, col);

    for (const [dR, dC] of Directions) {
      const nextRow = row + dR;
      const nextCol = col + dC;

      if (isValidPos(nextRow, nextCol)) {
        const nextChar = garden[nextRow][nextCol];

        if (char == nextChar) {
          plant.adj++;
        }
      }
    }

    plants.push(plant);
    price += 4 - plant.adj;
  }
}

console.log(price);
