import { readFileSync } from 'node:fs';

const file = readFileSync('./input.txt', 'utf8');
const ranges = file.split(',').map((r) => r.split('-'));

/**
 * Part 1
 */

const sum1 = ranges.reduce((sum, range) => {
  const start = parseInt(range[0]);
  const end = parseInt(range[1]);
  let tmp = 0;

  for (let current = start; current < end + 1; current++) {
    const str = `${current}`;
    const len = str.length;

    if (len % 2) {
      continue;
    }

    const left = str.slice(0, len / 2);
    const right = str.slice(len / 2);

    if (left === right) {
      tmp += current;
    }
  }

  return sum + tmp;
}, 0);

console.log(sum1);

/**
 * Part 2
 */

const sum2 = ranges.reduce((sum, range) => {
  const start = parseInt(range[0]);
  const end = parseInt(range[1]);
  let tmp = 0;

  for (let current = start; current < end + 1; current++) {
    const str = `${current}`;
    const len = str.length;
    const half = Math.floor(len / 2);

    for (let i = 1; i < half + 1; i++) {
      const bit = str.slice(0, i);
      let valid = false;

      for (let j = i; j < len; j += i) {
        const other = str.slice(j, j + i);

        if (bit !== other) {
          valid = true;
          break;
        }
      }

      if (!valid) {
        tmp += current;
        break;
      }
    }
  }

  return sum + tmp;
}, 0);

console.log(sum2);
