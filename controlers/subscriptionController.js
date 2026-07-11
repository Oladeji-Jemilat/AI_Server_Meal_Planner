const userModel = require ("../models/userModel")
const {getEndDate} = require ("../utils/date")
const crypto = require("crypto")


const initializeSubscription = async (req, res) => {
    try {
        const user = req.user
        const { plan } = req.body
        if(user.subscription.status == `active`) {
            return res.status(400).json({ success: false, message: "You already have an active subscription" })
        }
        if (!plan) return res.status(400).json({ success: false, message: "Plan is required" })
        const planAmounts = {
            monthly: 10000 * 100,
            quarterly: 28000 * 100,
            yearly: 99999 * 100
        }
        const amount = planAmounts[plan]
        if (!amount) return res.status(400).json({ success: false, message: "Invalid plan" })
        const data = {
            email: user.email,
            amount,
            metadata: {
                userId: user._id,
                plan
            }
        }
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const resData = await response.json()
        console.log(resData)
        res.status(200).json(resData)
    } catch (error) {
        console.log(error)
    }
}

// activate subscription
// 
const activateSubscription = async (req, res) => {
    try {
        const hash = crypto
            .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
            .update(req.body)
            .digest("hex");

        if (hash !== req.headers["x-paystack-signature"]) {
            return res.status(401).send("Invalid signature");
        }

        const body = JSON.parse(req.body.toString());

        if (body.event === "charge.success") {
            const { userId, plan } = body.data.metadata;

            const startDate = new Date();
            const endDate = getEndDate(plan);

            await userModel.findByIdAndUpdate(userId, {
                subscription: {
                    status: "active",
                    plan,
                    startDate,
                    endDate,
                    reference: body.data.reference
                }
            });
        }

        return res.status(200).send("OK");
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// cancel subscription => refund

module.exports = {
    initializeSubscription,
    activateSubscription
}