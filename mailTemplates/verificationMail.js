const transporter =require("../config/nodemailer")


//verification email
const verificationEmail = (name, email, token)=>{
  transporter.sendMail({
    to:email,
    subject:'Verify your account',
    from:`"JayMeal App" <support@JayMeal App.com>`,
    sender:`noreply@mailer.JayMealApp.com`,
    html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Account</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .header {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 24px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0.5px;
    }

    .content {
      padding: 32px 24px;
      color: #333333;
      line-height: 1.6;
    }

    .content h2 {
      margin-top: 0;
      font-size: 22px;
      color: #111111;
    }

    .button {
      display: inline-block;
      background-color: #000000;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 30px;
      border-radius: 50px;
      font-weight: 600;
      letter-spacing: 0.4px;
      margin-top: 24px;
      transition: background 0.3s ease;
    }

    .button:hover {
      background-color: #222222;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #777777;
    }

    @media (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">JayMeal App</div>
    <div class="content">
      <h2>Verify Your Account</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        Thank you for signing up for Jaymeal App! Please verify your email address
        by clicking the button below.
      </p>
      <p style="text-align: center;">
        <a href="${process.env.FRONTEND_DOMAIN}/verify/${token}" class="button">Verify My Account</a>
      </p>
      <p>
        If you didn’t create an account, please ignore this email.
      </p>
    </div>
    <div class="footer">
      &copy; 2025 JayMeal App. All rights reserved.
    </div>
  </div>
</body>
</html>
`


  })
}

module.exports = verificationEmail