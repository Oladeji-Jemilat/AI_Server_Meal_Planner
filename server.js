const express = require ("express")
const cors = require ("cors")
const morgan = require ("morgan")
const connectToDb = require("./config/db")
require ("./config/nodemailer")
const {activateSubscription} = require ("./controlers/subscriptionController")
const dotenv = require("dotenv")
dotenv.config()
const app = express()


//routes
const authRoutes =require("./routes/authRoutes")
const userRoutes = require("./routes/userRoute")

const PORT = process.env.PORT
connectToDb()
app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`);
})

app.post(
    "/api/subscription/webhook",
    express.raw({ type: "*/*" }),  
    activateSubscription
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/fit-plan", require("./routes/fitPlanRoute"))
app.use("/api/subscription", require("./routes/subscriptionRoute"))





//https://github.com/Oladeji-Jemilat/AI_Server_Meal_Planner.git