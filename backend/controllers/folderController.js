const Folder = require('../models/Folder.js');
const Image = require('../models/Image.js'); // Image model import karein cleanup ke liye

// 1. Create Folder
exports.createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const newFolder = new Folder({
      name,
      parentId: parentId || null,
      userId: req.user.id
    });
    await newFolder.save();
    res.json(newFolder);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// 2. Get Folders (Parent-Child logic ke saath)
exports.getFolders = async (req, res) => {
  try {
    const parentId = req.query.parentId || null;
    const folders = await Folder.find({ userId: req.user.id, parentId });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// 3. Delete Folder (+ Inside Images Cleanup)
exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    // Pehle check karein ki folder user ka hi hai
    const folder = await Folder.findOne({ _id: folderId, userId: req.user.id });
    if (!folder) return res.status(404).json({ msg: "folder are not found " });

    // Step A: Is folder ke andar ki saari Images delete karein
    await Image.deleteMany({ folderId: folderId });

    // Step B: Folder ko delete karein
    await Folder.findByIdAndDelete(folderId);

    res.json({ msg: "Delete files" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};