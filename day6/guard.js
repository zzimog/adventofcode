/**
 * Directions:
 *
 *     -1
 *
 * -1   0   +1
 *
 *     +1
 */

const calcDelta = (direct) => {
  const dr = -1 * Math.round(Math.sin(direct * (Math.PI / 180)));
  const dc = Math.round(Math.cos(direct * (Math.PI / 180)));

  return { dr, dc };
};

export default class Guard {
  constructor() {
    this.row = null;
    this.col = null;

    // start facing up
    this.direction = 90;
  }

  get position() {
    const row = this.row;
    const col = this.col;

    return [row, col];
  }

  set(row, col) {
    this.row = row;
    this.col = col;
  }

  turnRight() {
    let dir = this.direction - 90 || 360;
    this.direction = dir;
  }

  getFrontCoords() {
    const { dr, dc } = calcDelta(this.direction);
    const row = this.row + dr;
    const col = this.col + dc;

    return [row, col];
  }

  getRightCoords() {
    const direct = this.direction - 90 || 360;
    const { dr, dc } = calcDelta(direct);
    const row = this.row + dr;
    const col = this.col + dc;

    return [row, col];
  }

  moveForward() {
    const [row, col] = this.getFrontCoords();
    this.set(row, col);
  }
}
