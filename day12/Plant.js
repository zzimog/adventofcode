export class Region {
  constructor(char, row, col) {
    this.char = char;
    this.row = Number(row);
    this.col = Number(col);
    this.plantKeys = new Set();
    this.plants = [];
  }

  get key() {
    return `${this.char};${this.row};${this.col}`;
  }
}

export class Plant {
  static key(row, col) {
    return `${row};${col}`;
  }

  constructor(row, col) {
    this.row = Number(row);
    this.col = Number(col);
    this.adj = [];
    this.diag = [];
  }

  get key() {
    return `${this.row};${this.col}`;
  }

  get perimeter() {
    return 4 - this.adj;
  }
}
