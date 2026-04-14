const multer = require('multer');
const path = require('path');

// Batao ki file kahan save hogi aur naam kya hoga
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Is folder ko backend root mein bana lena
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

module.exports = upload;