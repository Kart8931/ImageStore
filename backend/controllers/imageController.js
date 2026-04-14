const Image = require('../models/Image.js');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "no files are select" });

    const newImage = new Image({
      name: req.file.originalname,
      imageUrl: `/uploads/${req.file.filename}`, // Local path
      folderId: req.body.folderId,
      userId: req.user.id
    });

    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getImagesByFolder = async (req, res) => {
  try {
    const images = await Image.find({ 
      folderId: req.params.folderId, 
      userId: req.user.id 
    });
    res.json(images);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, userId: req.user.id });
    if (!image) return res.status(404).json({ msg: "Image not found!" });

    await Image.findByIdAndDelete(req.params.id);
    res.json({ msg: "Image Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};