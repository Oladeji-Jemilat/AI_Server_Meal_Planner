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
        trim:true
    },
    gender:{
        type:String,
        trim:true,
        enum:["male", "female"]
    },
    height:{
        type:String,
        trim:true
    },
    weight:{
        type:String,
        trim:true
    },
    goal:{
        type:String,
        enum:["lose weight", "maintain weight", "gain weight"],
        
    },
    activityLevel:{
        type:String,
        trim:true,
        enum:["moderate", "active", "very_active"],
        default:"moderate"
    },
    dietPreference:{
        type:String,
        trim:true,
        enum:[
            "none",
            "balanced",
            "high_protein",
            "vegetarian",
            "vegan",
            "gluten_free",
        ],
        default:"none"
    },
    timePerDay:{
        type:String,
        trim:true,
        min:10
    },
    planAccess:{
        type:String,
        trim:true,
        enum:["free", "premium", "pro"],
        default:"free"
    },
    
     isVerified: {
        type: Boolean,
        default: false

    },
    verificationToken:{
        type:String,
        default:null
    },
    verificationExp:{
        type:Date,
        default:null
    },
    subscription:{
        status:{
            type:String,
            enum:["inactive", "active", "yearly"],
            default:"inactive"
        },
        plan:{
             type:String,
            enum:["weekly", "monthly", "yearly"]

        },
        startDate:Date,
         endDate:Date,
         paymentRefrence:String   

        
    }


})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel