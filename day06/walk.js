import { isInBound, getMapSize, cloneMap } from '../utils.js';
import Guard from './Guard.js';

const getStartPoint = (map) => {
  for (const row in map) {
    const col = map[row].indexOf('^');

    if (col > -1) {
      return [row, col];
    }
  }

  throw new Error('map has no start point');
};

export function walkArea(map) {
  const guard = new Guard();
  const visited = new Map();

  const [ROWS, COLS] = getMapSize(map);
  const [startRow, startCol] = getStartPoint(map);

  const validCoords = (row, col) => {
    return isInBound(row, ROWS) && isInBound(col, COLS);
  };

  const shouldTurn = () => {
    const [frontRow, frontCol] = guard.getFrontCoords();

    if (!validCoords(frontRow, frontCol)) {
      return;
    }

    return map[frontRow][frontCol] === '#';
  };

  let area = 0;
  guard.set(startRow, startCol);

  while (true) {
    const [row, col] = guard.position;

    if (!validCoords(row, col)) {
      break;
    }

    for (let turns = 0; shouldTurn(); turns++) {
      if (turns === 4) {
        throw new Error(`stuck: ${row}, ${col}`);
      }

      guard.turnRight();
    }

    let visitKey = guard.position.join(',');
    let visit = visited.get(visitKey);

    if (visit) {
      if (visit.includes(guard.direction)) {
        throw new Error('loop');
      } else {
        visit.push(guard.direction);
        visited.set(visitKey, visit);
      }
    } else {
      area += 1;
      visited.set(visitKey, [guard.direction]);
    }

    guard.moveForward();
  }

  return area;
}

export function possibleObstacles(map) {
  const obstacles = [];

  for (let row in map) {
    for (let col in map[row]) {
      const possibleMap = cloneMap(map);
      const [startRow, startCol] = getStartPoint(possibleMap);

      if (
        (row == startRow && col == startCol) ||
        possibleMap[row][col] == '#'
      ) {
        continue;
      }

      console.log(`try: ${row}, ${col}`);
      possibleMap[row][col] = '#';

      try {
        walkArea(possibleMap);
      } catch (e) {
        obstacles.push([row, col]);
      }
    }
  }

  return obstacles;
}
