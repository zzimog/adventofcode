import { cloneMap, isInBound } from '../../utils.js';
import Point from './Point.js';

export default function (map, ROWS, COLS, antennas) {
  const antimap = cloneMap(map);
  let antiCount = 0;

  antennas.forEach((a1, idx) => {
    const others = antennas.slice(idx + 1).filter((a2) => {
      return a1.char == a2.char;
    });

    if (!others.length) {
      return;
    }

    others.forEach((a2) => {
      const dR = a2.row - a1.row;
      const dC = a2.col - a1.col;
      const anti1 = new Point(a1.row - dR, a1.col - dC, '#');
      const anti2 = new Point(a2.row + dR, a2.col + dC, '#');

      if (
        isInBound(anti1.row, ROWS) &&
        isInBound(anti1.col, COLS) &&
        antimap[anti1.row][anti1.col] !== '#'
      ) {
        antiCount += 1;
        antimap[anti1.row][anti1.col] = '#';
      }

      if (
        isInBound(anti2.row, ROWS) &&
        isInBound(anti2.col, COLS) &&
        antimap[anti2.row][anti2.col] !== '#'
      ) {
        antiCount += 1;
        antimap[anti2.row][anti2.col] = '#';
      }
    });
  });

  return antiCount;
}
