import { join } from 'node:path';
import { getFileLines, cloneMap, getMapSize, isInBound } from '../../utils.js';

const Directions = Object.freeze([
  [-1, 0],
  [0, +1],
  [1, 0],
  [0, -1],
]);

const input = join(import.meta.dirname, './input.txt');

const starts = [];
const map = await getFileLines(input, (line, r) => {
  return line.split('').map((h, c) => {
    const height = Number(h);
    const row = Number(r);
    const col = Number(c);

    if (height == 0) {
      starts.push({ row, col });
    }

    return height;
  });
});

const [ROWS, COLS] = getMapSize(map);

const validPos = (row, col) => {
  return isInBound(row, ROWS) && isInBound(col, COLS);
};

const getScore = (useVisited) => {
  const walkR = (row, col, visited) => {
    const height = map[row][col];
    let score = 0;

    if (height == 9) {
      if (useVisited && visited[row][col] === 'X') {
        return 0;
      }

      visited[row][col] = 'X';
      return 1;
    }

    for (const [dR, dC] of Directions) {
      const newRow = row + dR;
      const newCol = col + dC;

      if (validPos(newRow, newCol) && map[newRow][newCol] - height == 1) {
        score += walkR(newRow, newCol, visited);
      }
    }

    return score;
  };

  return starts.reduce((sum, start) => {
    const { row, col } = start;
    const visited = cloneMap(map);

    return (sum += walkR(row, col, visited));
  }, 0);
};

console.log('Part 1 score: %d', getScore(true));
console.log('Part 2 score: %d', getScore(false));
