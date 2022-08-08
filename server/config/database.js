const mongoose = require("mongoose");

const dbConnect = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = dbConnect;