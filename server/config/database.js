const mongoose = require("mongoose");

const dbConnect = async () => {
    const conn = await mongoose.connect(process.env.MONGO_DB);
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = dbConnect;