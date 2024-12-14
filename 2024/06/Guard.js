/**
 * Directions:
 *
 *     -1
 *
 * -1   0   +1
 *
 *     +1
 */

// [vertical, horizontal]
const Directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

export default class Guard {
  constructor() {
    this.row = null;
    this.col = null;

    // start facing up
    this.direction = 0;
  }

  get position() {
    const row = this.row;
    const col = this.col;

    return [row, col];
  }

  set(row, col) {
    this.row = parseInt(row);
    this.col = parseInt(col);
  }

  turnRight() {
    let dir = this.direction;
    this.direction = dir == 3 ? 0 : dir + 1;
  }

  getFrontCoords() {
    const [dr, dc] = Directions[this.direction];
    const row = this.row + dr;
    const col = this.col + dc;

    return [row, col];
  }

  moveForward() {
    const [row, col] = this.getFrontCoords();
    this.set(row, col);
  }
}
