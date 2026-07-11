const express = require("express")
const {updateUser, viewUserProfile} = require("../controlers/userController")
const isLoggedIn = require ("../middlewares/isLoggedIn")
const userRouter = express.Router()


//method
userRouter.put("/updateuser", isLoggedIn,  updateUser)
userRouter.get('/viewprofile/:_id', isLoggedIn, viewUserProfile);


module.exports = userRouter


//age gender height weight goal timePerDay dietPreference