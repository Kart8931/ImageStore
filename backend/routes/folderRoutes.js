const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware.js');
const { createFolder, getFolders ,deleteFolder} = require('../controllers/folderController.js');

router.post('/', auth, createFolder);
router.get('/', auth, getFolders);
router.delete('/:id', auth,deleteFolder);

module.exports = router;