const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const blacklistedToken = require("../models/blacklistedToken")

const isLoggedIn = async (req, res, next) => {
    try {
        let token;
        //1. check if there's token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token is required"
            })
        }
  
        // 2. validate the token and its expiration
        const { email } = jwt.verify(token, process.env.jwt_secret)
        // console.log(decoded)

        // 3. check if it has not been blacklisted
        const isBlacklisted = await blacklistedToken.findOne({ token })
        if (isBlacklisted) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid: blacklisted"
            })
        }


        // 4. Find the user with the payload
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
      
        

        // 5. Modify the req object by adding the user
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        if (error.message === "jwt malformed") {
            return res.status(400).json({ success: false, message: "Token is invalid" })
        } else if (error.message === "jwt expired") {
            return res.status(400).json({ success: false, message: "TOken has expired. kindly login again" })
        } else {
            return res.status(400).json({ success: false, message: error.message || "something went wrong" })
        }
    }
}




module.exports = isLoggedIn
