import { readFileLine } from '../../utils.js';

export default async function (input) {
  let a = null;
  let b = null;
  let c = null;
  let p = null;

  await readFileLine(input, (line, row) => {
    switch (row) {
      case 0: {
        a = line.replace(/[^\d]/g, '');
        break;
      }
      case 1: {
        b = line.replace(/[^\d]/g, '');
        break;
      }
      case 2: {
        c = line.replace(/[^\d]/g, '');
        break;
      }
      case 3:
        break;
      case 4: {
        p = line.replace(/[^\d,]/g, '').split(',');
        break;
      }
    }
  });

  const prog = [];

  for (let i = 0; i < p.length; i += 2) {
    prog.push([p[i], p[i + 1]]);
  }

  return { a, b, c, prog };
}
