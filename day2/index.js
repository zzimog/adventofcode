import { join } from 'node:path';
import getFileLines from '../get-file-lines.js';

const input = join(import.meta.dirname, './input.txt');
const reports = (await getFileLines(input)).map((line) => line.split(' '));

const isReportSafe = (report) => {
  return report.every((val, i) => {
    if (i === 0) return true;

    const mult = Math.sign(report[1] - report[0]);
    const diff = mult * (val - report[i - 1]);

    return diff > 0 && diff < 4;
  });
};

const safe = reports.filter((report) => {
  return isReportSafe(report);
});

console.log('Valid reports count: %d', safe.length);

const canBeSafe = reports.filter((report) => {
  for (let index in report) {
    let reduced = [...report];
    reduced.splice(index, 1);

    if (isReportSafe(reduced)) {
      return true;
    }
  }

  return false;
});

console.log('Safe report removing one item: %d', canBeSafe.length);
