import { getEmptyMap } from '../../utils.js';

export default class TimeMap {
  constructor(ROWS, COLS, robots) {
    this.rows = Number(ROWS);
    this.cols = Number(COLS);
    this.robots = [...robots];
  }

  get(t) {
    let map = getEmptyMap(this.rows, this.cols, 0);

    this.robots.forEach((robot) => {
      robot.getPos(t);
      map[robot.Pr][robot.Pc] += 1;
    });

    return map;
  }

  getCharMap(t) {
    let map = getEmptyMap(this.rows, this.cols, '.');

    this.robots.forEach((robot) => {
      robot.getPos(t);
      map[robot.Pr][robot.Pc] = '#';
    });

    return map;
  }
}
