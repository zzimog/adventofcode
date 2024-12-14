import { join } from 'node:path';
import { getFileLines, isInBound } from '../utils.js';

const input = join(import.meta.dirname, './input.txt');
const lines = (await getFileLines(input)).map((l) => l.split(''));
const ROWS = lines.length;
const COLS = lines[0].length;

const checkWordR = (word, matrix, row, col, h, v, index = 0) => {
  if (!isInBound(row, ROWS) || !isInBound(col, COLS) || index >= word.length) {
    return 0;
  }

  const current = matrix[row][col];
  const check = word[index];

  if (current == check) {
    if (index == word.length - 1) {
      return 1;
    } else {
      return checkWordR(word, matrix, row + v, col + h, h, v, index + 1);
    }
  }

  return 0;
};

/**
 * Part 1
 */
const WORD = 'XMAS';
let count = 0;

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    // horizontal
    count += checkWordR(WORD, lines, i, j, 1, 0);
    count += checkWordR(WORD, lines, i, j, -1, 0);

    // vertical
    count += checkWordR(WORD, lines, i, j, 0, 1);
    count += checkWordR(WORD, lines, i, j, 0, -1);

    // diagonal
    count += checkWordR(WORD, lines, i, j, -1, -1);
    count += checkWordR(WORD, lines, i, j, -1, 1);
    count += checkWordR(WORD, lines, i, j, 1, -1);
    count += checkWordR(WORD, lines, i, j, 1, 1);
  }
}

console.log(`Word '${WORD}' count: ${count}`);

/**
 * Part 2
 */
const XWORD = 'MAS';
let xcount = 0;

const checkXmas = (matrix, row, col) => {
  if (!isInBound(row, 1, ROWS - 1) || !isInBound(col, 1, COLS - 1)) {
    return 0;
  }

  const current = matrix[row][col];
  let flag = 0;

  if (current != 'A') return 0;

  flag += checkWordR(XWORD, matrix, row - 1, col - 1, 1, 1);
  flag += checkWordR(XWORD, matrix, row + 1, col - 1, 1, -1);
  flag += checkWordR(XWORD, matrix, row - 1, col + 1, -1, 1);
  flag += checkWordR(XWORD, matrix, row + 1, col + 1, -1, -1);

  return flag == 2 ? 1 : 0;
};

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    xcount += checkXmas(lines, i, j);
  }
}

console.log(`X-Word '${XWORD}' count: ${xcount}`);
