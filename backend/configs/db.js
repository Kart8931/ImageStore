const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected:");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Error hone par app ko stop kar dega
    }
};

module.exports = dbConnect;