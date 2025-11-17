const express = require ("express")
const cors = require ("cors")
const connectToDb = require("./config/db")
require ("./config/nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const app = express()



//routers
const authRoutes =require("./routes/authRoutes")


const PORT = process.env.PORT
connectToDb()
app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`);

})


app.use(express.json())
app.use(cors())


app.use("/api/auth", authRoutes)