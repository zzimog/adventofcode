import { join } from 'node:path';
import { getFileLines } from '../../utils.js';
import verify1 from './verify1.js';
import verify2 from './verify2.js';

const input = join(import.meta.dirname, './input.txt');

const tests = await getFileLines(input, (line) => {
  let [result, values] = line.split(':');

  result = Number(result);
  values = values
    .trim()
    .split(' ')
    .map((v) => Number(v.trim()));

  return { result, values };
});

/**
 * Part 1
 */

const sum1 = tests
  .filter(({ values, result }) => {
    const results = verify1(values, result);
    return results.length > 0;
  })
  .reduce((sum, { result }) => {
    return (sum += result);
  }, 0);

console.log('Part 1, sum: %d', sum1);

/**
 * Part 2
 */

const sum2 = tests
  .filter(({ values, result }) => {
    const results = verify2(values, result);
    return results.length > 0;
  })
  .reduce((sum, { result }) => {
    return (sum += result);
  }, 0);

console.log('Part 2, sum: %d', sum2);
