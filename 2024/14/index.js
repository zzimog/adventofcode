import { join } from 'node:path';
import { getFileLines } from '../../utils.js';
import Robot from './Robot.js';
import getSafetyFactor from './getSafetyFactor.js';
import getEasterEggTime from './getEasterEggTime.js';

const isTest = false;

const [ROWS, COLS] = isTest ? [7, 11] : [103, 101];
const filename = isTest ? './test.txt' : './input.txt';

const input = join(import.meta.dirname, filename);
const robots = await getFileLines(input, (line) => {
  let [start, vel] = line.replace(/[^\s\d-,]/g, '').split(' ');
  return new Robot(start.split(','), vel.split(','), COLS, ROWS);
});

console.log('Safety factor: %d', getSafetyFactor(ROWS, COLS, robots));
getEasterEggTime(ROWS, COLS, robots, 7584, 7585);
