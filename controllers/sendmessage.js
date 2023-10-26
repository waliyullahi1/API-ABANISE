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

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
} catch (error) {
    console.log('Error: ', error);
}
 
};
  module.exports = sendmessage;