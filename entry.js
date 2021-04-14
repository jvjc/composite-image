const { program } = require('commander');
const pkg = require('./package.json');

const generator = require('./generator');
const { validator } = require('./helpers');

const validate = validator(program);

program.version(pkg.version);

program
  .requiredOption('--input <url or local file>', 'input image')
  .requiredOption('--watermark <url or local file>', 'watermark image')
  .option('--position <position>', 'watermark position\n[center|centre|north|east|south|west|northeast|southeast|southwest|northwest]', validate.position)
  .option('--composite <position>', 'watermark position\n[clear|source|over|in|out|atop|dest|dest-over|dest-in|dest-out|dest-atop|xor|add|saturate|multiply|screen\n|overlay|darken|lighten|colour-dodge|color-dodge|colour-burn,color-burn|hard-light|soft-light|difference|exclusion]', validate.composite)
  .option('--width <pixels>', 'watermark width', validate.integer)
  .option('--height <pixels>', 'watermark height', validate.integer)
  .option('--angle <degrees>', 'watermark angle', validate.integer)
  .option('--vars <json>', 'watermark replaceable vars, only works in svg input files', validate.jsonify)
  .option('--output <path>', 'output path');

program.parse(process.argv);

generator(program.opts());
