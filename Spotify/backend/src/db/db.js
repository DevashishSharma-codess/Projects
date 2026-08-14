const mongoose = require('mongoose');

async function connectDB(){
    // Check if we have an existing database connection
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try{
        console.log('[DB] Attempting to connect to MongoDB...');
        console.log('[DB] MONGO_URI exists:', !!process.env.MONGO_URI);
        if (process.env.MONGO_URI) {
            console.log('[DB] URI snippet:', process.env.MONGO_URI.substring(0, 30) + '...');
        } else {
            throw new Error('MONGO_URI environment variable is missing or undefined');
        }
        
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            retryWrites: true,
            maxPoolSize: 10,
        });
        
        console.log('[DB] ✓ Successfully connected to MongoDB');
        console.log('[DB] Connection state:', mongoose.connection.readyState);
        return connection;
    }
    catch(error){
        console.error('[DB] ✗ Connection failed:', error.message);
        throw error;
    }
}

module.exports = connectDB;