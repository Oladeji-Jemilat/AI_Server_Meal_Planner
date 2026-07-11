const express = require('express');
const { createFitnessPlan, getFitnessPlanHistory, getLatestFitnessPlan } = require('../controlers/fitPLanController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isActiveSubscriber = require ("../middlewares/subscription")
const fitPlanRoute = express.Router();

fitPlanRoute.post('/create', isLoggedIn, createFitnessPlan)
fitPlanRoute.get("/history", isLoggedIn, getFitnessPlanHistory);
fitPlanRoute.get("/latest", isLoggedIn,  getLatestFitnessPlan);

module.exports = fitPlanRoute;