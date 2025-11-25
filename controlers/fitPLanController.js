const { generateObject, generateText } = require("ai")
const { googleAi } = require("../config/gemini")
const { aiPlanSchema } = require("../schemas/fitnessPlanSchema")
const { fitnessPlanAiPrompt } = require("../utils/aiprompts")
const FitnessPlanModel = require ("../models/fitnessPlanModel")

const createFitnessPlan = async (req, res) => {
    try {
        const user = req.user

        //valiadate profile field
        const { age, gender, height, weight, goal, dietPreference, timePerDay } = user
        const requiredFields = { age, gender, height, weight, goal, timePerDay, dietPreference };
        for (const key in requiredFields) {
            if (!requiredFields[key]) {
                return res.status(400).json({
                    message: `${key} is required. Please update your profile.`,
                });
            }
        }
        const response = await generateObject({
            model: googleAi("gemini-2.5-flash"),
            prompt: fitnessPlanAiPrompt(user),
            schema: aiPlanSchema
        })

           const plan = response.object;

           //save plan to database
            const savedPlan = await FitnessPlanModel.create({
            userId: user._id,
            ...plan
        });
            res.status(200).json({
            success: true,
            message: "Fitness plan generated successfully",
            plan: savedPlan
        });  
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}


const getFitnessPlanHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const plans = await FitnessPlanModel.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: plans.length,
            plans
        });

    } catch (error) {

        res.status(500).json({ message: "Unable to fetch history", error });
    }
};


const getLatestFitnessPlan = async (req, res) => {
    try {
        const userId = req.user._id;

        const latestPlan = await FitnessPlanModel.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestPlan) {
            return res.status(404).json({ message: "No fitness plan found." });
        }

        res.status(200).json({
            success: true,
            plan: latestPlan
        });

    } catch (error) {
        res.status(500).json({ message: "Unable to fetch latest plan", error });
    }
};

module.exports = { createFitnessPlan, getLatestFitnessPlan, getFitnessPlanHistory };
