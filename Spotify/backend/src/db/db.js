const mongoose = require('mongoose');

async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            retryWrites: true,
            maxPoolSize: 10,
        })  
            console.log("db connected")
    }
    catch(error){
        console.error('db connection error' , error);
    }
}
module.exports = connectDB;