const express = require("express")
const {signUp, login, verificationUser, logout} = require("../controlers/authControler")
const isLoggedIn = require ("../middlewares/isLoggedIn")
const authRouter = express.Router()


//method
authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/verify/:token", verificationUser)
authRouter.post("/logout", isLoggedIn, logout)


module.exports = authRouter