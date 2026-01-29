const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection options
        const mongoClientOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        // Use Docker MongoDB URL if in Docker environment, otherwise use local with auth
        const mongoUrl = process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/studentauthdb?authSource=admin';

        const conn = await mongoose.connect(mongoUrl, mongoClientOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
