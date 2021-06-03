var express = require('express');
var router = express.Router();
const memesAPI = require('./meme.api')
const imagesAPI = require('./images.api')

//establishes routes for memes actions
router.use('/memes', memesAPI)

//establishes routes for images actions
router.use('/images', imagesAPI)

module.exports = router;
