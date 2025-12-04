import { getFileLines } from '../../utils.js';

const map = await getFileLines('./input.txt', (line) => line.split(''));

function arrayMax(array) {
  let value = -Infinity;
  let index = -1;

  array.forEach((val, i) => {
    if (val > value) {
      value = val;
      index = i;
    }
  });

  return { value, index };
}

function getTotal(n) {
  return map.reduce((sum, bank) => {
    const first = arrayMax(bank.slice(0, bank.length - (n - 1)));
    let value = first.value;
    let prevIndex = first.index;

    for (let i = n - 1; i > 0; i--) {
      const sub = bank.slice(prevIndex + 1, bank.length - i + 1);
      const max = arrayMax(sub);
      value = `${value}${max.value}`;
      prevIndex = prevIndex + max.index + 1;
    }

    return sum + parseInt(value);
  }, 0);
}

/**
 * Part 1
 */

const total1 = getTotal(2);
console.log(total1);

/**
 * Part 2
 */

const total2 = getTotal(12);
console.log(total2);
