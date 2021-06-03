const Jimp = require("jimp");

const scaleToFit = async function (req, res, next) {
  if (req.file) {
    try {
      const image = await Jimp.read(req.file.path);
      await image.scaleToFit(400, 400).write(req.file.path);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(new Error("Image required"));
  }
};

const putTextOnImage = async (
  originalImagePath,
  outputMemePath,
  topText,
  bottomText) => {
  try {
    
    const image = await Jimp.read(originalImagePath);
    await image.scaleToFit(200, 200);
    const dimension = {
      width: image.bitmap.width,
      height: image.bitmap.height,
    };
      const topFont = await Jimp.loadFont(
        Jimp[`FONT_SANS_${topText.size}_${topText.color}`]
      );
      const bottomFont = await Jimp.loadFont(
        Jimp[`FONT_SANS_${bottomText.size}_${bottomText.color}`]
      );
      console.log(topFont)
      await image.print(
        topFont,
        0,
        25,
        {
          text: topText.topText,
          alignmentX: Jimp[topText.alignmentX],
          alignmentY: Jimp[topText.alignmentY],
        },
        dimension.width,
        dimension.height
      );
      await image.print(
        bottomFont,
        0,
        dimension.height - 50,
        {
          text: bottomText.bottomText,
          alignmentX: Jimp[bottomText.alignmentX],
          alignmentY: Jimp[bottomText.alignment],
        },
        dimension.width,
        dimension.height
      );
    await image.writeAsync(outputMemePath);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  scaleToFit,
  putTextOnImage,
};
