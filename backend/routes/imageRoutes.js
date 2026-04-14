const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/uploadMiddleware.js');
const { uploadImage, getImagesByFolder, deleteImage} = require('../controllers/imageController.js');

// 'image' wahi naam hai jo Postman mein 'key' mein aayega
router.post('/upload', auth, upload.single('image'), uploadImage);
router.get('/:folderId', auth, getImagesByFolder);
router.delete('/:id', auth, deleteImage); 
module.exports = router;