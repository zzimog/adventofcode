import { cloneMap, getFileLines } from '../../utils.js';

const map = await getFileLines('./input.txt', (l) => l.split(''));
const start = map[0].join('').indexOf('S');

/**
 * Part 1
 */

function sum1() {
  let sum = 0;

  function moveR(map, row, pos) {
    if (row === map.length || map[row][pos] === '|') {
      return;
    }

    if (map[row][pos] === '^') {
      sum++;
      moveR(map, row, pos - 1);
      moveR(map, row, pos + 1);
      return;
    }

    map[row][pos] = '|';
    moveR(map, row + 1, pos);
  }

  moveR(cloneMap(map), 0, start);
  return sum;
}

console.log(sum1());

/**
 * Part 2
 */

const cache = new Map();

function sum2() {
  function moveR(map, row, pos) {
    if (row === map.length) {
      return 1;
    }

    if (map[row][pos] === '^') {
      const key = `${row}|${pos}`;

      if (cache.has(key)) {
        return cache.get(key);
      }

      const left = moveR(map, row, pos - 1);
      const right = moveR(map, row, pos + 1);
      const sum = left + right;

      cache.set(key, sum);
      return sum;
    }

    return moveR(map, row + 1, pos);
  }

  return moveR(cloneMap(map), 0, start);
}

console.log(sum2());
