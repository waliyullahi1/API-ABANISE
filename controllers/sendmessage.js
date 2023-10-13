const nodemailer = require('nodemailer');
const User = require('../model/Users'); 
const jwt = require('jsonwebtoken');

const sendmessage = async (req, res) => {
    const { email, attachment } = req.body;
    
  
    if (email || attachment) {
     
    
      
   // Token expires after 1 hour
  
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
        subject: 'Scratch Card Pin', 
        text: `Dear customer Thanks for your subscription and your can also get the pin you Buy At Abaniseedu by view the pdf `, 
        attachment:'ttttttttttt'// plain text body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send('Error sending email.');
        return res.status(200).json({ sucess: " If an account with that email exists, a password reset link has been sent.  " });
      });
    } else {
      return res.status(400).json({ message: " enter your email " });
    }
  };

  module.exports = sendmessage;