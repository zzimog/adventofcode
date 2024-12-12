const getBlocksMap = (disk) => {
  const blocks = [];
  let id = 0;

  disk.forEach((block, index) => {
    let isFile = index % 2 == 0;
    let size = Number(block);

    for (let i = 0; i < size; i++) {
      if (isFile) {
        blocks.push({ id });
      } else {
        blocks.push('.');
      }
    }

    if (isFile) id += 1;
  });

  return blocks;
};

export default function (disk) {
  const defragged = getBlocksMap(disk);

  let i = 0;
  let j = defragged.length - 1;

  while (i < j) {
    while (defragged[i] != '.') i++;
    while (defragged[j] == '.') j--;

    defragged[i] = defragged[j];
    defragged[j] = '.';

    i++;
    j--;
  }

  return defragged;
}
