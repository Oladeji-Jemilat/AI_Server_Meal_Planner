const express = require ("express")
const cors = require ("cors")
const morgan = require ("morgan")
const connectToDb = require("./config/db")
require ("./config/nodemailer")
const {activateSubscription} = require ("./controlers/subscriptionController")
const dotenv = require("dotenv")
dotenv.config()
const app = express()


//routers
const authRoutes =require("./routes/authRoutes")
const userRoutes = require("./routes/userRoute")

app.post(
    "/api/subscription/webhook",
    express.raw({ type: "*/*" }),   // keep body as buffer
    activateSubscription
);

const PORT = process.env.PORT
connectToDb()
app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))


app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/fit-plan", require("./Routes/fitPlanRoute"))
app.use("/api/subcription", require("./routes/subscriptionRoute"))

//https://github.com/Oladeji-Jemilat/AI_Server_Meal_Planner.git