import { cloneMap, isInBound } from '../../utils.js';
import Point from './Point.js';

export default function (map, ROWS, COLS, antennas) {
  const antimap = cloneMap(map);
  let antiCount = 0;

  antennas.forEach((a1, idx) => {
    const others = antennas.slice(idx + 1).filter((a2) => {
      return a1.char == a2.char;
    });

    if (antimap[a1.row][a1.col] !== '#') {
      antiCount += 1;
      antimap[a1.row][a1.col] = '#';
    }

    if (!others.length) {
      return;
    }

    others.forEach((a2) => {
      const dR = a2.row - a1.row;
      const dC = a2.col - a1.col;

      (function makeAnti1(row, col) {
        const anti1 = new Point(row - dR, col - dC, '#');

        if (!isInBound(anti1.row, ROWS) || !isInBound(anti1.col, COLS)) {
          return;
        }

        if (antimap[anti1.row][anti1.col] !== '#') {
          antiCount += 1;
          antimap[anti1.row][anti1.col] = '#';
        }

        makeAnti1(anti1.row, anti1.col);
      })(a1.row, a1.col);

      (function makeAnti2(row, col) {
        const anti2 = new Point(row + dR, col + dC, '#');

        if (!isInBound(anti2.row, ROWS) || !isInBound(anti2.col, COLS)) {
          return;
        }

        if (antimap[anti2.row][anti2.col] !== '#') {
          antiCount += 1;
          antimap[anti2.row][anti2.col] = '#';
        }

        makeAnti2(anti2.row, anti2.col);
      })(a2.row, a2.col);
    });
  });

  for (let line of antimap) {
    console.log(line.join(''));
  }

  return antiCount;
}
