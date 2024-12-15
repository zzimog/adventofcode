import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

//    -1
// -1 .. +1
//    +1
// [row, col]
export const Directions = Object.freeze([
  [-1, 0], // 0 up
  [0, +1], // 1 right
  [+1, 0], // 2 down
  [0, -1], // 3 left
]);

// -1,-1 | -1,+1
// ------+------
// +1,-1 | +1,+1
// [row, col]
export const Diagonals = Object.freeze([
  [-1, -1], // 0 up-left
  [-1, +1], // 1 up-right
  [+1, -1], // 2 down-left
  [+1, +1], // 3 down-right
]);

export function readFileLine(path, callback) {
  return new Promise((resolve) => {
    const stream = createReadStream(path, 'utf8');
    const lines = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    let count = 0;
    lines.on('line', (line) => callback(line, count++));
    lines.on('close', resolve);
  });
}

export async function getFileLines(path, parse) {
  const lines = [];
  await readFileLine(path, (line) => {
    lines.push(parse ? parse(line, lines.length) : line);
  });
  return lines;
}

export function isInBound(val, min, max = null) {
  if (max === null) {
    max = min;
    min = 0;
  }

  return val >= min && val < max;
}

export const getMapSize = (map) => {
  const rows = map.length;
  const cols = map[0].length;

  return [rows, cols];
};

export const cloneMap = (map) => {
  const newMap = [];

  for (const row of map) {
    newMap.push([...row]);
  }

  return newMap;
};

export const getEmptyMap = (rows, cols, fill = null) => {
  const map = [];

  for (let i = 0; i < rows; i++) {
    map[i] = [];

    for (let j = 0; j < cols; j++) {
      map[i][j] = fill;
    }
  }

  return map;
};
