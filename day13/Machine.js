export class Machine {
  constructor(x, y) {
    this.prize = { x, y };
    this.A = null
    this.B = null
  }
}

export class Button {
  constructor(x, y) {
    this.x = Number(x)
    this.y = Number(y)
  }
}