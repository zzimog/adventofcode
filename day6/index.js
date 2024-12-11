import { join } from 'node:path';
import { getFileLines, isInBound } from '../utils.js';
import Guard from './guard.js';

const input = join(import.meta.dirname, './input.txt');

const guard = new Guard();
const map = await getFileLines(input, (line, row) => {
  let lineArray = line.split('');
  let col = line.indexOf('^');

  if (col > -1) {
    guard.set(row, col);
  }

  return lineArray;
});

const ROWS = map.length;
const COLS = map[0].length;

const validCoords = (row, col) => {
  return isInBound(row, ROWS) && isInBound(col, COLS);
};

let area = 0;
let obstacles = [];

function walkR(row, col) {
  const turnR = (i = 0) => {
    const [frontRow, frontCol] = guard.getFrontCoords();

    if (i === 4) {
      throw new Error(`stuck: ${row}, ${col}`);
    }

    if (map[frontRow][frontCol] === '#') {
      guard.turnRight();
      turnR(i + 1);
    }
  };

  if (!validCoords(row, col)) {
    return;
  }

  if (map[row][col] !== 'X') {
    area += 1;
    map[row][col] = 'X';
  }

  turnR();
  guard.moveForward();
  walkR.apply(null, guard.position);
}

walkR.apply(null, guard.position);

console.log('Covered area: %d', area);
console.log('Obstacles possible positions: %d', obstacles.length);
