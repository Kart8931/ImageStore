const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./configs/db.js');
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database Connection
dbConnect();

// API Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/folders', require('./routes/folderRoutes.js'));
app.use('/api/images', require('./routes/imageRoutes.js'));

// ✅ Correct root path
const rootDir = path.resolve();
const frontendDistPath = path.join(rootDir, "frontend", "dist");

// ✅ Serve static files
app.use(express.static(frontendDistPath));

// ✅ Wildcard route (exclude /api)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Server start (keep this LAST)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));