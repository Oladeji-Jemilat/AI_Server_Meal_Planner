const crypto = require("crypto")
const generateStr = (num=8)=>{
    const str = crypto.randomBytes(num).toLocaleString("hex")
    return str
}

module.exports= generateStr