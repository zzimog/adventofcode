import { join } from 'node:path';
import { readFileLine } from '../utils.js';

const input = join(import.meta.dirname, './input.txt');

const rules = new Map();
const updates = [];
let readRules = true;

await readFileLine(input, (line) => {
  if (!line.trim()) {
    readRules = false;
  }

  if (readRules) {
    let [page, before] = line.split('|');
    let arr = rules.get(page) || [];

    arr = arr.concat(before);
    rules.set(page, arr);
  } else {
    updates.push(line.split(','));
  }
});

const valid = [];
const invalid = [];

const isPageValid = (update, index) => {
  const page = update[index];
  const rule = rules.get(page);
  const before = update.slice(0, index);

  if (!rule || !before.length) {
    return true;
  }

  return before.every((page) => {
    return !rule.includes(page);
  });
};

const midSum = (updates) => {
  return updates.reduce((sum, pages) => {
    const midIndex = Math.floor(pages.length / 2);
    return sum + Number(pages[midIndex]);
  }, 0);
};

/**
 * Part 1
 */

updates.forEach((update) => {
  for (let index in update) {
    let isValid = isPageValid(update, index);

    if (!isValid) {
      invalid.push(update);
      return;
    }
  }

  valid.push(update);
});

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

console.log('Sorted mid pages sum: %d', midSum(sorted));
