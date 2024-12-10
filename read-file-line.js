import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

export default function (path, callback) {
  return new Promise((resolve) => {
    const stream = createReadStream(path, 'utf8');

    const lines = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    lines.on('line', callback);
    lines.on('close', resolve);
  });
}
