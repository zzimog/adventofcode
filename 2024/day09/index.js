import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import defrag1 from './defrag1.js';
import defrag2 from './defrag2.js';

const input = join(import.meta.dirname, './input.txt');
const disk = readFileSync(input, 'utf8').split('');

const checksum1 = defrag1(disk)
  .filter((v) => v != '.')
  .reduce((sum, { id }, index) => {
    return (sum += index * id);
  }, 0);

console.log('Checksum 1: %d', checksum1);

const checksum2 = defrag2(disk).reduce((sum, block, index) => {
  if (block === '.') {
    return sum;
  }

  return (sum += index * block.id);
}, 0);

console.log('Checksum 2: %d', checksum2);
