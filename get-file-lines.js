import readFileLine from './read-file-line.js';

export default async function (path) {
  const lines = [];
  await readFileLine(path, (line) => lines.push(line));
  return lines;
}
