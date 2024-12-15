export default class Robot {
  constructor([c, r], [Vc, Vr], Lc, Lr) {
    this.r = Number(r);
    this.c = Number(c);
    this.Vr = Number(Vr);
    this.Vc = Number(Vc);
    this.Lr = Number(Lr);
    this.Lc = Number(Lc);
    this.Pr = this.r;
    this.Pc = this.c;
  }

  static calcPos(s, v, L, t) {
    return (((s + v * t) % L) + L) % L;
  }

  getPos(t) {
    this.Pr = Robot.calcPos(this.r, this.Vr, this.Lr, t);
    this.Pc = Robot.calcPos(this.c, this.Vc, this.Lc, t);
  }
}
