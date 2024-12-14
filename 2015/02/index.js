import { join } from 'node:path';
import { getFileLines } from '../../utils.js';

const input = join(import.meta.dirname, './input.txt');
const boxes = await getFileLines(input, (l) => {
  return l.split('x').map((c) => Number(c));
});

const paperArea = boxes.reduce((sum, [l, w, h]) => {
  const [l1, l2, l3] = [l * w, w * h, l * h];
  const smallest = Math.min(l1, l2, l3);

  return sum + 2 * l1 + 2 * l2 + 2 * l3 + smallest;
}, 0);

const ribbonLenght = boxes.reduce((sum, box) => {
  const sizes = [...box]
  const max = Math.max.apply(null, sizes);
  sizes.splice(sizes.indexOf(max), 1);

  const [s1, s2] = sizes;

  return sum + (s1 + s2) * 2 + box.reduce((m, s) => m * s, 1);
}, 0);

console.log(paperArea);
console.log(ribbonLenght);
