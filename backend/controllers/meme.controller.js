const fs = require("fs");
const photoHelper = require("../middleware/photo.helper");

const createMeme = async (req, res, next) => {
  try {
    //Read data from json file
    let rawData = fs.readFileSync("memes.json");
    let memes = JSON.parse(rawData).memes;

    const meme = {};

    meme.topText = JSON.parse(req.body.topText);
    meme.bottomText = JSON.parse(req.body.bottomText);
    
    //Prepare data for new name
    meme.id = `${Date.now()}`;
    meme.originalImage = req.file.filename;
    meme.originalImagePath = req.file.path;
    const newFilename = `MEME_${meme.id}`;
    const newDirectory = `public/memes`; //req.file.destination = public/images
    const newFilenameExtension = meme.originalImage.split(".").slice(-1); //.png
    meme.outputMemePath = `${newDirectory}/${newFilename}.${newFilenameExtension}`;

    //Puts text on the image
    await photoHelper.putTextOnImage(
      meme.originalImagePath,
      meme.outputMemePath,
      meme.topText,
      meme.bottomText,
    );

    //Add the new meme to the beginning of the list and save it to the json file
    meme.createdAt = Date.now();
    meme.updatedAt = Date.now();
    memes.unshift(meme);
    fs.writeFileSync("memes.json", JSON.stringify({ memes }));
    res.status(201).json(meme);
  } catch (error) {
    next(error);
  }
};

const getMemes = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.page) || 10;

    //Read data from the json file
    let rawData = fs.readFileSync("memes.json");
    let memes = JSON.parse(rawData).memes;

    //Calculate slicing
    const totalMemes = memes.length;
    const totalPages = Math.ceil(totalMemes / perPage);
    const offset = perPage * (page - 1);
    memes = memes.slice(offset, offset + perPage);

    res.json({ memes, totalPages });
  } catch (error) {
    next(error);
  }
};



const getOriginalImages = (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = req.query.page || 10;

    //Read data from the json file
    let rawData = fs.readFileSync("memes.json");
    let memes = JSON.parse(rawData).memes;
    let originalImages = memes.map((item) => item.originalImagePath);
    originalImages = originalImages.filter(
      (item, i, arr) => arr.indexOf(item) === i
    );

    //Calculate slicing
    const totalMemes = memes.length;
    const totalPages = Math.ceil(totalMemes / perPage);
    const offset = perPage * (page - 1);
    originalImages = originalImages.slice(offset, offset + perPage);

    res.json({ originalImages, totalPages });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMeme,
  getMemes,
  getOriginalImages,
};
