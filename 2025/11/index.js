import { getFileLines } from '../../utils.js';

const data = (
  await getFileLines('./input.txt', (line, i) => {
    const [device, outputs] = line.split(':').map((s) => s.trim());
    return [device, outputs.split(' ').map((s) => s.trim())];
  })
).reduce((data, [device, outputs]) => {
  return { ...data, [device]: outputs };
}, []);

/**
 * Part 1
 */

function exploreR1(current) {
  if (current === 'out') {
    return 1;
  }

  return data[current].reduce((sum, cur) => {
    return sum + exploreR1(cur);
  }, 0);
}

const sum1 = exploreR1('you');
console.log(sum1);

/**
 * Part 2
 */

const cache = new Map();
function exploreR2(current, found1, found2) {
  if (current === 'out') {
    if (found1 && found2) {
      return 1;
    } else {
      return 0;
    }
  } else if (current === 'fft') {
    found1 = true;
  } else if (current === 'dac') {
    found2 = true;
  }

  return data[current].reduce((sum, cur) => {
    const key = `${cur}|${found1}|${found2}`;

    const cached = cache.get(key);
    if (cached !== undefined) {
      return sum + cached;
    }

    const result = exploreR2(cur, found1, found2);
    cache.set(key, result);
    return sum + result;
  }, 0);
}

const sum2 = exploreR2('svr');
console.log(sum2);
