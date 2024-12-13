import { join } from 'node:path';
import { readFileSync } from 'node:fs';

const input = join(import.meta.dirname, './input.txt');
const file = readFileSync(input, 'utf8').replace(/\r/g, '').split('\n\n');

const machines = file.map((chunk) => {
  const line = chunk.split('\n');
  const parse = (line) => {
    let coords = line.replace(/[^\d,]/g, '').split(',');
    return {
      x: Number(coords[0]),
      y: Number(coords[1]),
    };
  };

  return {
    a: parse(line[0]),
    b: parse(line[1]),
    p: parse(line[2]),
  };
});

const cramer = (a1, b1, c1, a2, b2, c2, mod = 0) => {
  const p1 = c1 + mod;
  const p2 = c2 + mod;
  const det = a1 * b2 - a2 * b1;

  if (det === 0) {
    return 0;
  }

  const A = (p1 * b2 - p2 * b1) / det;
  const B = (a1 * p2 - a2 * p1) / det;

  if (!Number.isInteger(A) || !Number.isInteger(B)) {
    return 0;
  }

  return A * 3 + B;
};

/**
 * Part 1
 */

const totalToken1 = machines.reduce((sum, machine) => {
  const btnA = machine.a;
  const btnB = machine.b;
  const prize = machine.p;

  return (sum += cramer(btnA.x, btnB.x, prize.x, btnA.y, btnB.y, prize.y));
}, 0);

console.log('Part 1, total token: %d', totalToken1);

/**
 * Part 2
 */

const totalToken2 = machines.reduce((sum, machine) => {
  const btnA = machine.a;
  const btnB = machine.b;
  const prize = machine.p;
  const mod = 10000000000000;

  return (sum += cramer(btnA.x, btnB.x, prize.x, btnA.y, btnB.y, prize.y, mod));
}, 0);

console.log('Part 2, total token: %d', totalToken2);
