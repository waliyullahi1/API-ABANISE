
const nodemailer = require('nodemailer');
const User = require('../model/Users'); 
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');



const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({email: email}).exec(); 

  if (foundUser) {
   
  
    const token = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRETY,
      { expiresIn: "100m" }
    ); 
  foundUser.resetToken = token;
 // Token expires after 1 hour
  await foundUser.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'waliuwaheed2021@gmail.com', 
        pass: 'onxr sqvu qtwa eblk'
      }
    });

    let mailOptions = {
      from: '"no-reply"waliuwaheed2021@gmail.com', 
      to: email, 
      subject: 'Password Reset', 
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://https://abaniseedu.vercel.app/verify/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send('Error sending email.');
      return res.status(200).json({ sucess: " If an account with that email exists, a password reset link has been sent.  " });
    });
  } else {
    return res.status(400).json({ message: " email does not exist  " });
  }
};




// Reset password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const foundUser = await User.findOne({ resetToken: token }).exec();
  
  if (foundUser) {
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    foundUser.password= hashedPwd 
    
    foundUser.resetToken ='',
    await foundUser.save()

    console.log(foundUser.password)
    return res.json({ message: "sucesssful" })
  } else {
    return res
      .status(400)
      .json({ message: "usermane and password are require" });
    }
};


module.exports = {requestPasswordReset, resetPassword}
