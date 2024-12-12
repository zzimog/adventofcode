const Type = Object.freeze({
  FILE: Symbol('file'),
  SPACE: Symbol('space'),
});

class Block {
  constructor(type, size, id = -1) {
    this.type = type;
    this.size = size;

    if (id > -1) {
      this.id = id;
    }
  }

  get isFile() {
    return this.type === Type.FILE;
  }

  get isSpace() {
    return this.type === Type.SPACE;
  }

  clone() {
    return new Block(this.type, this.size, this.id);
  }
}

const getBlocksMap = (disk) => {
  const blocks = [];
  let fileId = 0;

  disk.forEach((block, index) => {
    let type = index % 2 == 0 ? Type.FILE : Type.SPACE;
    let size = Number(block);
    let id = type == Type.FILE ? fileId++ : -1;
    let newBlock = new Block(type, size, id);
    blocks.push(newBlock);
  });

  return blocks.filter((block) => {
    return block.size > 0;
  });
};

const defrag = (disk) => {
  const def = getBlocksMap(disk);

  for (let j = def.length - 1; j > 0; j--) {
    if (def[j].isSpace) {
      continue;
    }

    for (let i = 0; i < j; i++) {
      if (def[i].isFile || def[i].size < def[j].size) {
        continue;
      }

      const file = def[j];
      const fileCopy = file.clone();
      let spaceLeft = def[i].size - file.size;

      if (spaceLeft < 0) {
        continue;
      }

      def[j] = new Block(Type.SPACE, file.size, -1);

      if (spaceLeft > 0) {
        def[i].size = spaceLeft;
        def.splice(i, 0, fileCopy);
      } else {
        def[i] = fileCopy;
      }

      j++;
      break;
    }
  }

  return def.reduce((blocks, block, index, init) => {
    if (block.isFile) {
      blocks.push(block);
      return blocks;
    }

    if (index < init.length - 2 && init[index + 1].isSpace) {
      return blocks;
    }

    for (let i = index - 1; i < index && init[i].isSpace; i--) {
      block.size += init[i].size;
    }

    blocks.push(block);
    return blocks;
  }, []);
};

export default function (disk) {
  const defragged = defrag(disk);
  const array = [];

  defragged.forEach(({ id, size }) => {
    for (let i = 0; i < size; i++) {
      if (id >= 0) {
        array.push({ id });
      } else {
        array.push('.');
      }
    }
  });

  return array;
}
