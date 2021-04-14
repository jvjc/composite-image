const process = require('process');
const sharp = require('sharp');
const got = require('got');
const fs = require('fs');

const { isAValidURL } = require('./helpers');

module.exports = async (params) => {
  let inputImage;
  let watermarkFile;

  let watermarkImage;

  if (isAValidURL(params.input)) {
    inputImage = (await got(params.input)).rawBody;
  } else {
    inputImage = params.input;
  }

  if (isAValidURL(params.watermark)) {
    watermarkFile = (await got(params.watermark)).rawBody;
  } else {
    watermarkFile = fs.readFileSync(params.watermark);
  }

  if (params.watermark.substr(-3) === 'svg') {
    let template = watermarkFile.toString();
    if (params.vars) {
      Object.keys(params.vars).forEach((key) => {
        template = template.replace(`{{${key}}}`, params.vars[key]);
      });
    }
    watermarkImage = sharp(Buffer.from(template));
  } else {
    watermarkImage = sharp(watermarkFile);
  }

  // Leemos la imagen de la url o el archivo
  const originalImage = await sharp(inputImage).jpeg();

  let newWidth;
  let newHeight;
  let padX;
  let padY;
  if (params.width && params.height) {
    newWidth = params.width;
    newHeight = params.height;

    padX = Math.ceil(newWidth * 0.1);
    padY = Math.ceil(newHeight * 0.1);
  } else if (params.width) {
    newWidth = params.width;

    padX = Math.ceil(newWidth * 0.1);
  } else if (params.height) {
    newHeight = params.height;

    padX = Math.ceil(newHeight * 0.1);
  } else {
    newHeight = 100;

    padX = Math.ceil(newHeight * 0.1);
  }

  if (!padY) {
    padY = padX;
  }

  const tmpImageBuffer = await watermarkImage
    .png().rotate(params.angle || 0).trim().toBuffer();

  const watermarkImageBuffer = await sharp(tmpImageBuffer).resize(newWidth, newHeight, { fit: 'inside' })
    .extend({
      top: padY,
      bottom: padY,
      left: padX,
      right: padX,
      background: {
        r: 255, g: 255, b: 255,
      },
    })
    .flatten({
      background: {
        r: 255, g: 255, b: 255,
      },
    })
    .toBuffer();

  const imageBuffer = await originalImage.composite([{
    input: watermarkImageBuffer,
    blend: params.composite || 'soft-light',
    gravity: params.position || 'northwest',
  }])
    .jpeg();

  if (params.output) {
    imageBuffer.toFile(params.output);
  } else {
    process.stdout.write(await imageBuffer.toBuffer());
  }
};
