const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


const mongodbUri  = process.env.MONGO_URI

//Connect db funtion
const connecToDb = async ()=>{

    try {
        const isConnected = await mongoose.connect(mongodbUri)
        if(isConnected){
            console.log("Database Connected Successfully!");
    }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = connecToDb