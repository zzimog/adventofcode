import {
  cloneMap,
  Diagonals,
  Directions,
  getMapSize,
  isInBound,
} from '../utils.js';
import { Plant, Region } from './Plant.js';

export default function (garden) {
  const [ROWS, COLS] = getMapSize(garden);

  const isValidPos = (row, col) => {
    return isInBound(row, ROWS) && isInBound(col, COLS);
  };

  const visited = cloneMap(garden);
  const regions = [];

  for (const i in garden) {
    for (const j in garden[i]) {
      const row = Number(i);
      const col = Number(j);
      const char = garden[row][col];

      if (visited[row][col] == '.') {
        continue;
      }

      const region = new Region(char, row, col);

      function gatherPlantsR(row, col) {
        const char = visited[row][col];

        if (char != region.char) return;
        visited[row][col] = '.';

        const plant = new Plant(row, col);

        for (const [dR, dC] of Directions) {
          let adjRow = row + dR;
          let adjCol = col + dC;

          if (
            isValidPos(adjRow, adjCol) &&
            garden[adjRow][adjCol] == region.char
          ) {
            plant.adj.push([dR, dC]);
          }
        }

        region.plantKeys.add(plant.key);
        region.plants.push(plant);

        // ⚠️ RECURSION HERE
        for (const [dR, dC] of Directions) {
          let adjRow = row + dR;
          let adjCol = col + dC;

          if (
            isValidPos(adjRow, adjCol) &&
            visited[adjRow][adjCol] == region.char
          ) {
            gatherPlantsR(adjRow, adjCol);
          }
        }
      }

      gatherPlantsR(region.row, region.col);

      region.plants.map((plant) => {
        for (const [dR, dC] of Diagonals) {
          let diagRow = plant.row + dR;
          let diagCol = plant.col + dC;

          if (region.plantKeys.has(Plant.key(diagRow, diagCol))) {
            plant.diag.push([dR, dC]);
          }
        }

        return plant;
      });

      regions.push(region);
    }
  }

  return regions;
}
