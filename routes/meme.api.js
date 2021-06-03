var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload.helper').upload
const download = require('../middleware/upload.helper').upload
const photoHelper = require('../middleware/photo.helper')
const memeController = require('../controllers/meme.controller')

/* GET all memes for homepage (domain/memes) */
router.get('/', memeController.getMemes);

/* POST new single meme home page. */
router.post('/', upload.single("image"), memeController.createMeme);

/* GET single meme on home page. */
// router.get('/:id', memeController.getSingleMeme)

/* PUT/Edit existing single meme on home page. */
// router.put('/:id', memeController.editSingleMeme)

/* DELETE single meme home page. */
// router.delete('/:id', memeController.deleteSingleMeme)

module.exports = router