class CPU {
  constructor(A, B, C) {
    this.setState(A, B, C);
  }

  setState(A, B, C) {
    this.A = Number(A);
    this.B = Number(B);
    this.C = Number(C);
  }
}
