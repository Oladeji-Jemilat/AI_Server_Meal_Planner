// const express = require("express")
// const isLoggedIn = require("../middlewares/isLoggedIn")
// const { initializeSubscription, activateSubscription } = require("../controlers/subscriptionController")
// const subscritionRouter = express.Router()

// subscritionRouter.post("/initialize", isLoggedIn, initializeSubscription)
// //subscritionRouter.post("/webhook", express.raw({type: "*/*"}),activateSubscription)

// module.exports = subscritionRouter

const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { initializeSubscription, activateSubscription } = require("../controlers/subscriptionController");

const subscritionRouter = express.Router();

// initialize payment (frontend call)
subscritionRouter.post("/initialize", isLoggedIn, initializeSubscription);

// webhook (Paystack calls this — NO auth middleware)
subscritionRouter.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    activateSubscription
);

module.exports = subscritionRouter;