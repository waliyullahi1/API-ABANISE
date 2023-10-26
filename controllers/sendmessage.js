const nodemailer = require('nodemailer');



const sendmessage = async (email, codes) => {
  
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
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:5173/verify/${codes}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send('Error sending email.');
    return res.status(200).json({ sucess: " If an account with that email exists, a password reset link has been sent.  " });
  });
 
};
  module.exports = sendmessage;