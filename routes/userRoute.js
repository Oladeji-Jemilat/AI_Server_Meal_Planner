const express = require("express")
const {updateUser} = require("../controlers/userController")
const isLoggedIn = require ("../middlewares/isLoggedIn")
const userRouter = express.Router()


//method
userRouter.put("/updateuser", isLoggedIn,  updateUser)

module.exports = userRouter


//age gender height weight goal timePerDay dietPreference