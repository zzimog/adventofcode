import TimeMap from './TimeMap.js';

export default function (ROWS, COLS, robots, t = 100) {
  const [MIDR, MIDC] = [Math.floor(ROWS / 2), Math.floor(COLS / 2)];

  const quadrants = [
    [0, 0, MIDR, MIDC],
    [0, MIDC + 1, MIDR, COLS],
    [MIDR + 1, 0, ROWS, MIDC],
    [MIDR + 1, MIDC + 1, ROWS, COLS],
  ];

  const countMap = new TimeMap(ROWS, COLS, robots).get(t);

  return quadrants.reduce((sf, [startR, startC, endR, endC]) => {
    let sum = 0;
    for (let i = startR; i < endR; i++) {
      for (let j = startC; j < endC; j++) {
        sum += countMap[i][j];
      }
    }
    return sf * sum;
  }, 1);
}
