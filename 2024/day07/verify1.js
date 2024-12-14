export default function verify1(values, expected) {
  const verifyR = (i, prog, op, expr) => {
    const results = [];
    const current = values[i];
    let result = prog;
    let operators = [...expr];

    if (i == 0) {
      result = current;
      operators = [];
    }

    switch (op) {
      case 0: {
        result += current;
        operators.push('+');
        break;
      }
      case 1: {
        result *= current;
        operators.push('*');
        break;
      }
    }

    if (i == values.length - 1) {
      return {
        result,
        operators,
      };
    }

    return results.concat(
      verifyR(i + 1, result, 0, operators),
      verifyR(i + 1, result, 1, operators)
    );
  };

  return verifyR(0, null, null, []).filter(({ result }) => {
    return result == expected;
  });
}
