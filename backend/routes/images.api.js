var express = require('express')
var router = express.Router()
const memeController = require('../controllers/meme.controller')

/* GET all images for images-only page at (domain/images) */
router.get('/',  memeController.getOriginalImages);

module.exports = router