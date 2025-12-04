import { cloneMap, getFileLines, getMapSize } from '../../utils.js';

const map1 = await getFileLines('./input.txt', (line) => line.split(''));
const [rows, cols] = getMapSize(map1);

/**
 * Part 1
 */

function isRoll(map, row, col) {
  try {
    return map[row][col] === '@' ? 1 : 0;
  } catch {
    return 0;
  }
}

function isRemovable(map, row, col) {
  if (map[row][col] === '.') {
    return 0;
  }

  let adj = 0;

  adj += isRoll(map, row - 1, col - 1);
  adj += isRoll(map, row - 1, col);
  adj += isRoll(map, row - 1, col + 1);
  adj += isRoll(map, row, col - 1);
  adj += isRoll(map, row, col + 1);
  adj += isRoll(map, row + 1, col - 1);
  adj += isRoll(map, row + 1, col);
  adj += isRoll(map, row + 1, col + 1);

  return adj < 4;
}

function getRemovablesCount(map) {
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      count += isRemovable(map, row, col);
    }
  }

  return count;
}

const count1 = getRemovablesCount(map1);
console.log(count1);

/**
 * Part 2
 */

function getRemovablesCountAll(map) {
  const newMap = cloneMap(map);
  let count = 0;

  while (getRemovablesCount(newMap)) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isRemovable(newMap, row, col)) {
          newMap[row][col] = '.';
          count++;
        }
      }
    }
  }
}

const count2 = getRemovablesCountAll(map1);
console.log(count2);
