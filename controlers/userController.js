const userModel = require("../models/userModel")

const updateUser = async (req, res) => {
    console.log("Decoded user from token:", req.user);
    
    try {
         const userId = req.user._id
        const updateData = req.body
        const{age, weight, gender, height, goal, timePerDay,  dietPreference} = updateData
        if(!age) return res.status(400).json({message:"age is required!"})
        if(!weight) return res.status(400).json({message:"weight is required!"})
        if(!goal) return res.status(400).json({message:"goal is required!"})
        if(!timePerDay) return res.status(400).json({message:"time is required!"})
        if(!gender) return res.status(400).json({message:"goal is required!"})
        if(!height) return res.status(400).json({message:"height is required!"})
        if(!dietPreference) return res.status(400).json({ message: "dietPreference is required" })    
                   
       
        const updateUser = await userModel.findByIdAndUpdate(userId, updateData, {new:true})
         if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "user not found!"
            })
        }

          res.status(200).json({
            success: true,
            message: "user updated successfully!",
            updateUser
        })
    } catch (error) {
       res.status(500).json({ message: 'Server error', error: error.message });
        

        
    }
}

module.exports={
    updateUser
}