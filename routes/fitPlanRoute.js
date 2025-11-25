const express = require('express');
const { createFitnessPlan, getFitnessPlanHistory, getLatestFitnessPlan } = require('../controlers/fitPLanController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isActiveSubscriber = require ("../middlewares/subscription")
const fitPlanRoute = express.Router();

fitPlanRoute.post('/create', isLoggedIn, isActiveSubscriber, createFitnessPlan)
fitPlanRoute.get("/history", isLoggedIn, isActiveSubscriber, getFitnessPlanHistory);
fitPlanRoute.get("/latest", isLoggedIn, isActiveSubscriber, getLatestFitnessPlan);

module.exports = fitPlanRoute;