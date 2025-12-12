import { getFileLines } from '../../utils.js';

const data = (
  await getFileLines('./input.txt', (line) => {
    if (line.length > 3) {
      const [size, boxes] = line.split(':').map((s) => s.trim());
      const [w, h] = size.split('x').map((s) => parseInt(s));
      const counts = boxes.split(' ').map((s) => parseInt(s.trim()));
      return [[w, h], counts];
    }
    return;
  })
).filter((line) => line);

const sum = data.reduce((sum, [size, counts]) => {
  const [w, h] = size;
  const area = w * h;
  const total = counts.reduce((sum, n) => sum + n * 9, 0);
  return sum + (total > area ? 0 : 1);
}, 0);

console.log(sum);
