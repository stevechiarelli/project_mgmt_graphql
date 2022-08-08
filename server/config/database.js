const mongoose = require("mongoose");

const dbConnect = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = dbConnect;