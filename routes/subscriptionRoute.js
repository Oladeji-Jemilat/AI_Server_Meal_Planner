const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const { initializeSubscription, activateSubscription } = require("../controlers/subscriptionController")
const subscritionRouter = express.Router()

subscritionRouter.post("/initialize", isLoggedIn, initializeSubscription)
//subscritionRouter.post("/webhook", express.raw({type: "*/*"}), activateSubscription )

module.exports = subscritionRouter