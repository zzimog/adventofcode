import { join } from 'node:path';
import { readFileLine } from '../utils.js';

const input = join(import.meta.dirname, './input.txt');

// Populate input lists
const [ls1, ls2] = await (async (path) => {
  const ls1 = [];
  const ls2 = [];

  await readFileLine(path, (line) => {
    let [l1, l2] = line.replace(/\s+/g, '|').split('|');
    ls1.push(l1);
    ls2.push(l2);
  });

  return [ls1, ls2];
})(input);

ls1.sort();
ls2.sort();

// Calculate lists difference sum
const diffSum = ls1.reduce((sum, value, index) => {
  const value2 = ls2[index];
  const diff = Math.abs(value - value2);
  return sum + diff;
}, 0);

console.log('Difference sum: %d', diffSum);

// Calculate similarity score
const countsMap = ls2.reduce((map, value) => {
  return map.set(value, (map.get(value) || 0) + 1);
}, new Map());

const simScore = ls1.reduce((sum, value) => {
  return sum + value * (countsMap.get(value) || 0);
}, 0);

console.log('Similarity score: %d', simScore);
