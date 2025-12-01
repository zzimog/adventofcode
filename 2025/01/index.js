import { getFileLines } from '../../utils.js';

function sum(value, add) {
  const MAX = 100;
  return (((value + add) % MAX) + MAX) % MAX;
}

const rotations = await getFileLines('./input.txt', (line) => {
  const match = line.match(/^([A-Z])([0-9]+)$/);
  const dir = match[1] === 'R' ? 1 : -1;

  return dir * match[2];
});

/**
 * Part 1
 */

const [count1] = rotations.reduce(
  ([prev, start], rot) => {
    const current = sum(start, rot);
    const count = current === 0 ? prev + 1 : prev;
    return [count, current];
  },
  [0, 50]
);

console.log(count1);

/**
 * Part 2
 */

const [count2] = rotations.reduce(
  ([prev, start], rot) => {
    const dir = rot / Math.abs(rot);
    let current = start;
    let tmp = 0;

    for (let i = 0; i < Math.abs(rot); i++) {
      current = sum(current, dir);
      if (current === 0) tmp++;
    }

    return [prev + tmp, current];
  },
  [0, 50]
);

console.log(count2);
