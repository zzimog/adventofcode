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
    return 4 - this.adj.length;
  }

  get corners() {
    const mask = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];

    let corners = 0;

    this.adj.forEach(([dR, dC]) => (mask[1 + dR][1 + dC] = 1));
    this.diag.forEach(([dR, dC]) => (mask[1 + dR][1 + dC] = 1));

    if (mask[0][0] == 0 && mask[0][1] == mask[1][0]) corners++;
    if (mask[0][2] == 0 && mask[0][1] == mask[1][2]) corners++;
    if (mask[2][0] == 0 && mask[2][1] == mask[1][0]) corners++;
    if (mask[2][2] == 0 && mask[2][1] == mask[1][2]) corners++;

    if (mask[0][0] == 1 && mask[0][1] == 0 && mask[1][0] == 0) corners++;
    if (mask[0][2] == 1 && mask[0][1] == 0 && mask[1][2] == 0) corners++;
    if (mask[2][0] == 1 && mask[2][1] == 0 && mask[1][0] == 0) corners++;
    if (mask[2][2] == 1 && mask[2][1] == 0 && mask[1][2] == 0) corners++;

    return corners;
  }
}
