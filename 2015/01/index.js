import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const input = join(import.meta.dirname, './input.txt');
const file = readFileSync(input, 'utf8');

let floor = 0;
let first = -1;

for (const i in file) {
  floor += file[i] == '(' ? 1 : -1;

  if (floor == -1 && first == -1) {
    first = Number(i) + 1;
  }
}

console.log(floor);
console.log(first);
