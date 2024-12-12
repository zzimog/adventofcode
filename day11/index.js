import { join } from 'node:path';
import { getFileLines } from '../utils.js';

const input = join(import.meta.dirname, './input.txt');
const stones = (await getFileLines(input, (l) => l.split(' ')))[0];

const applyRules = (stone) => {
  let str = '' + stone;
  let len = str.length;

  // Rule 1
  if (stone == 0) {
    return [1];
  }

  // Rule 2
  if (len % 2 == 0) {
    let left = Number(str.slice(0, len / 2));
    let right = Number(str.slice(len / 2));

    return [left, right];
  }

  // Rule 3
  return [stone * 2024];
};

const cache = new Map();

const iterate = (array, times) => {
  const iterateR = (i, prev) => {
    if (i == times) {
      return prev.length;
    }

    let count = 0;
    for (let stone of prev) {
      const key = `${times - i},${stone}`;

      if (!cache.has(key)) {
        const next = applyRules(stone);
        cache.set(key, iterateR(i + 1, next));
      }

      count += cache.get(key);
    }

    return count;
  };

  return iterateR(0, array);
};

console.log('25 iterations: %d', iterate(stones, 25));
console.log('75 iterations: %d', iterate(stones, 75));
