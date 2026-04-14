const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./configs/db.js');
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(cors(
  { origin:process.env.FRONTEND_URL,
    credentials:true
  }
));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
dbConnect();


app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/folders', require('./routes/folderRoutes.js'));
app.use('/api/images', require('./routes/imageRoutes.js'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const frontendDistPath = path.join(__dirname, "../../frontend/dist");

// Serve the static files
app.use(express.static(frontendDistPath));


app.get(/.*/, (_, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});