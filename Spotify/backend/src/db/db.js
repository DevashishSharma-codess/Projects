const mongoose = require('mongoose');

async function connectDB(){

    try{
        console.log('[DB] Attempting to connect to MongoDB...');
        console.log('[DB] URI:', process.env.MONGO_URI?.substring(0, 50) + '...');
        
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            retryWrites: true,
            maxPoolSize: 10,
        })  
        console.log('[DB] ✓ Successfully connected to MongoDB');
    }
    catch(error){
        console.error('[DB] ✗ Connection failed:', error.message);
        console.error('[DB] Full error:', error);
        throw error;
    }
}
module.exports = connectDB;