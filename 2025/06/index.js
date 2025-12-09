import { getFileLines } from '../../utils.js';

const FILE_NAME = './input.txt';

/**
 * Part 1
 */

async function sum1() {
  const lines = await getFileLines(FILE_NAME, (line) => {
    return line.match(/[\d|*|+]+/g);
  });

  const values = lines.slice(0, -1);
  const operators = lines[lines.length - 1];

  return operators.reduce((sum, op, i) => {
    let tmp = op === '+' ? 0 : 1;

    for (const col of values) {
      const value = parseInt(col[i]);

      if (op === '+') {
        tmp += value;
      } else if (op === '*') {
        tmp *= value;
      }
    }

    return sum + tmp;
  }, 0);
}

console.log(await sum1());

/**
 * Part 2
 */

async function sum2() {
  const lines = await getFileLines(FILE_NAME, (line) => {
    return line.split('').reverse().join('');
  });

  const values = lines.slice(0, -1).map((l) => l.split(''));
  const operators = lines[lines.length - 1].replace(/\s*/g, '').split('');

  const newValues = [];
  let group = [];
  for (let i = 0; i < values[0].length; i++) {
    let str = '';

    for (let j = 0; j < values.length; j++) {
      str += values[j][i];
    }

    if (str.trim() === '') {
      newValues.push(group);
      group = [];
      continue;
    }

    group.push(parseInt(str));
  }
  newValues.push(group);

  return newValues.reduce((sum, group, i) => {
    const op = operators[i];
    let tmp = op === '+' ? 0 : 1;

    for (const val of group) {
      if (op === '+') {
        tmp += val;
      } else if (op === '*') {
        tmp *= val;
      }
    }

    return sum + tmp;
  }, 0);
}

console.log(await sum2());
