const nodemailer =require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

//create  nodemailer transpoter
const transpoter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.APP_USER,
        pass:process.env.APP_PASS
    }
})

transpoter.verify((err, success)=>{
    if(success){
        console.log("nodemailer is ready!");
        
    }else{
        console.log(err);
        
    }
})

module.exports= transpoter