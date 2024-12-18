import { join } from 'node:path';
import parseFile from './parseInput.js';

const input = join(import.meta.dirname, './test.txt');
const { a, b, c, prog } = await parseFile(input);

console.log(a, b, c);
console.log(prog);
