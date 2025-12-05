import { readFileLine } from '../../utils.js';

const ranges = [];
const ingredients = [];

await readFileLine('./input.txt', (line) => {
  if (/\d+-\d+/.test(line)) {
    const values = line.split('-').map((v) => parseInt(v));
    ranges.push(values);
  } else if (line.trim().length > 0) {
    const value = parseInt(line);
    ingredients.push(value);
  }
});

/**
 * Part 1
 */

const sum1 = ingredients.reduce((sum, ingredient) => {
  for (const [start, end] of ranges) {
    if (ingredient >= start && ingredient <= end) {
      return sum + 1;
    }
  }

  return sum;
}, 0);

console.log(sum1);

/**
 * Part 2
 */

const sorted = ranges.sort((a, b) => a[0] - b[0]);
const merged = [];
let current = sorted[0];

for (let i = 1; i < sorted.length; i++) {
  const next = sorted[i];

  if (next[0] <= current[1] + 1) {
    current[1] = Math.max(current[1], next[1]);
  } else {
    merged.push([...current]);
    current = [...next];
  }
}

merged.push([...current]);

const sum2 = merged.reduce((sum, [start, end]) => {
  return sum + (end - start + 1);
}, 0);

console.log(sum2);
