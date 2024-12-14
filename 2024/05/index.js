import { join } from 'node:path';
import { readFileLine } from '../../utils.js';

const input = join(import.meta.dirname, './input.txt');

const rules = new Map();
const updates = [];
let readRules = true;

await readFileLine(input, (line) => {
  if (!line.trim()) {
    readRules = false;
  }

  if (readRules) {
    let [page, rule] = line.split('|');
    let arr = rules.get(page) || [];

    arr.push(rule);
    rules.set(page, arr);
  } else {
    updates.push(line.split(','));
  }
});

const valid = [];
const invalid = [];

const isPageValid = (update, index) => {
  const page = update[index];
  const pageRules = rules.get(page) || [];
  const before = update.slice(0, index);

  for (const rule of pageRules) {
    if (before.includes(rule)) {
      return false;
    }
  }

  return true;
};

const midSum = (updates) => {
  return updates.reduce((sum, pages) => {
    const half = Math.floor(pages.length / 2);
    return sum + Number(pages[half]);
  }, 0);
};

updates.forEach((update) => {
  for (let index in update) {
    const isValid = isPageValid(update, index);

    if (!isValid) {
      invalid.push(update);
      return;
    }
  }

  valid.push(update);
});

/**
 * Part 1
 */

// 5208
console.log('Mid pages sum: %d', midSum(valid));

/**
 * Part 2
 */

const sorted = invalid.map((update) => {
  let sorted = [...update];

  for (let index in sorted) {
    let tmpIndex = index;

    while (!isPageValid(sorted, tmpIndex)) {
      let tmp = sorted[tmpIndex - 1];
      sorted[tmpIndex - 1] = sorted[tmpIndex];
      sorted[tmpIndex] = tmp;
      tmpIndex = tmpIndex - 1;
    }
  }

  return sorted;
});

// 6732
console.log('Sorted mid pages sum: %d', midSum(sorted));
