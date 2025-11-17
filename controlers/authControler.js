const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel =require("../models/userModel")
const generateStr = require("../utils/randomStr")
const verificationEmail = require ("../mailTemplates/verificationMail")
const blacklistedToken =require ("../models/blacklistedToken")



//signup function
const signUp =async(req, res)=>{
    const {name, email, password}= req.body
try {
    //hash password
    const salt = await bcrypt.genSalt(8)
    const hashPass = await bcrypt.hash(password, salt)

    //generate verification token
    const verificationToken = generateStr(6)

    //vallidity
    const verificationExp = Date.now() + 1000*60*30

    //create user 
    const user = await userModel.create({...req.body, password:hashPass, verificationToken, verificationExp})
if(!user){
    return res.status(400).json({
        success:false,
        message:"unsuccessful!"
    })
}

//send verification mail
verificationEmail(name, email, verificationToken)

res.status(201).json({
    success:true,
    message:"Kindly Verify Your mail"
})
    
} catch (error) {
    console.log(error);
    
}
}

//login 
const login= async(req, res)=>{
    const {email, password}= req.body

    //find user
    try {
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            return res.status(404).json({
                success:false,
                message:"email or password incorrect!"
            })
        }
//check if the email correct
const isPassword = await bcrypt.compare(password, user.password)
if(!isPassword){
    return res.status(404).json({
         success:false,
         message:"email or password incorrect!"
    })
}

//access token
const token = jwt.sign({email, id:user._id}, process.env.jwt_secret,{
    expiresIn:process.env.jwt_exp
})

    res.status(200).json({
     success:true,
     message:"logging successfully",
     token,
     user
})
    } catch (error) {
        console.log(error);
        
    }
}



const verificationUser = async (req, res) => {
    console.log(req.params)
    const { token } = req.params
    try {
        // find the user with the token
        const user = await userModel.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Token is invalid or has been verified"
            })
        }

        // check if it hasn't expired
        if (Date.now() > user.verificationExp) {
            return res.status(400).json({
                success: false,
                message: "Token has expired"
            })
        }

        // await userModel.findByIdAndUpdate(user._id, {verificationExp: null, verificationToken: null, isVerified: true})

        user.verificationToken = null
        user.verificationExp = null
        user.isVerified = true
        await user.save()

        res.status(200).json({
            success: true,
            message: "Account verified succesfully!"
        })
    } catch (error) {
        console.log(error)
    }
}


const logout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        if(!token){
             return res.status(403).json({
                success: false,
                message: "Token is required"
            })
        }
        await blacklistedToken.create({ token })
        res.status(200).json({
            success: true,
            message: "logout successfully!"
        })
    } catch (error) {
        console.log(error)

    }
}


//module export
module.exports = {
signUp,
login, 
verificationUser,
logout
}