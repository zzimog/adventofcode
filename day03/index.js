import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const inputPath = join(import.meta.dirname, './input.txt');
const input = readFileSync(inputPath, 'utf8');

const regx = /mul\((?<arg1>\d{1,3}),(?<arg2>\d{1,3})\)/g;

const multSum = input.matchAll(regx).reduce((sum, { groups }) => {
  const { arg1, arg2 } = groups;
  return (sum += arg1 * arg2);
}, 0);

console.log('Sum of mult: %d', multSum);

const doMultSum = input
  .split('do()')
  .map((chunk) => chunk.split("don't")[0])
  .join('')
  .matchAll(regx)
  .reduce((sum, { groups }) => {
    const { arg1, arg2 } = groups;
    return (sum += arg1 * arg2);
  }, 0);

console.log("Sum do/don't: %d", doMultSum);
