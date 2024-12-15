import TimeMap from './TimeMap.js';
import treeMask from './treeMask.js';

export default function (ROWS, COLS, robots, min, max) {
  for (let t = min; t < max; t++) {
    let timemap = new TimeMap(ROWS, COLS, robots).getCharMap(t);

    //console.log('calculating easter egg minimum time... (ctrl+c to exit)');

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        try {
          for (let i = 0; i < treeMask.length; i++) {
            for (let j = 0; j < treeMask[i].length; j++) {
              if (treeMask[i][j] != timemap[r + i][c + j]) {
                throw new Error();
              }
            }
          }
        } catch {
          continue;
        }

        console.log(`Easter egg minimum time : %d`, t);

        for (let line of timemap) {
          console.log(line.join(''));
        }

        return;
      }
    }
  }
}
