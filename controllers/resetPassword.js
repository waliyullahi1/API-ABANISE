const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../model/Users'); 
const jwt = require('jsonwebtoken');




const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({email: email}).exec(); 

  if (foundUser) {
    const secretKey =  process.env.RESET_TOKEN_SECRETY; 
    const payload = { email: foundUser.email, id: foundUser._id };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    foundUser.resetToken = token;
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
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send('Error sending email.');
      res.status(200).send('If an account with that email exists, a password reset link has been sent.');
    });
  } else {
    res.status(400).send('No account with that email address exists.');
  }
};




// Reset password
const resetPassword =  (req, res) => {
  const { token, newPassword } = req.body;
  const user = findUserByToken(token); 
  if (user) {
    updateUserPassword(user, newPassword); 
    res.send('Your password has been updated.');
  } else {
    res.status(400).send('Invalid password reset token.');
  }
};


module.exports = {requestPasswordReset, resetPassword}