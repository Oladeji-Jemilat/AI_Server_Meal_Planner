const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    age:{
        type:Number,
        require:false
    },
    gender:{
        type:String,
        enum:["male", "female"]
    },
    height:{
        type:Number,
        require:false
    },
    weight:{
        type:Number,
        require:false
    },
    goal:{
        type:String,
        enum:["weight_gain", "weight_loss"],
        require:false
    },
    activityLevel:{
        type:String,
        enum:["moderate", "active", "very_active"],
        default:"moderate"
    },
    dietPref:{
        type:String,
        enum:["none", "vegetarian", "vegan"],
        default:"none"
    },
    planAccess:{
        type:String,
        enum:["free", "premium", "pro"]
    },
    verificationToken:{
        type:String,
        default:null
    },
    verificationExp:{
        type:Date,
        default:null
    }


})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel