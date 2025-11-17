const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    age:{
        type:Number,
        require:true
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
        require:true
    },
    goal:{
        type:String,
        enum:["weight_gain", "weight_loss"],
        require:true
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
        enum:["free", "premium", "pro"],
        default:"free"
    }


})

const mealModel = mongoose.model("meals", userSchema)
module.exports = mealModel