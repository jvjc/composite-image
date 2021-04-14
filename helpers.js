const positions = [
  'center',
  'centre',
  'north',
  'east',
  'south',
  'west',
  'northeast',
  'southeast',
  'southwest',
  'northwest',
];

const composite = [
  'clear',
  'source',
  'over',
  'in',
  'out',
  'atop',
  'dest',
  'dest-over',
  'dest-in',
  'dest-out',
  'dest-atop',
  'xor',
  'add',
  'saturate',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'colour-dodge',
  'color-dodge',
  'colour-burn,color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
];

const isAValidURL = (string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const validator = (commander) => ({
  position: (value) => {
    if (positions.indexOf(value) === -1) {
      throw new commander.InvalidOptionArgumentError('Not valid position.');
    }
    return value;
  },
  composite: (value) => {
    if (composite.indexOf(value) === -1) {
      throw new commander.InvalidOptionArgumentError('Not valid position.');
    }
    return value;
  },
  integer: (value) => {
    const parsedValue = +value;
    if (Number.isNaN(parsedValue)) {
      throw new commander.InvalidOptionArgumentError('Not a number.');
    }
    return parsedValue;
  },
  jsonify: (value) => {
    try {
      const obj = JSON.parse(value);
      if (typeof obj === 'object') {
        return obj;
      }
    } catch (_) {
      throw new commander.InvalidOptionArgumentError('Not a valid object.');
    }
    return undefined;
  },
});

module.exports = {
  validator,
  isAValidURL,
};
