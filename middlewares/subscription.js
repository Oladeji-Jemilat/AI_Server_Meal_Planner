// const isActiveSubscriber = async (req, res, next) => {
//     const user = req.user
//     if (user.subscription.status !== "active") {
//         return res.status(403).json({
//             success: false,
//             message: "Unauthorized. Kindly activate your subscription to perform this action"
//         })
//     }

//     next()
// }

// module.exports = isActiveSubscriber

const isActiveSubscriber = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not found"
            });
        }

        if (!user.subscription || user.subscription.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized. Kindly activate your subscription to perform this action"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

module.exports = isActiveSubscriber;