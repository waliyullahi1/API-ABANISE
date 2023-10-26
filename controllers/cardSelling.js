
const Card_pin = require('../model/cards')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')
const axios = require("axios");
const { format, parseISO } = require('date-fns')
const nodemailer = require('nodemailer');

async function refrenceId() {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos');
    let time = response.data.datetime;
    time = time.split('.')[0];
    // time = time.replace('T', ' ');
    time = time.replace(/\D/g, '');
    return time;
  } catch (error) {
    console.error(error);
  }
}
refrenceId();

async function transactiondate() {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos');
    let time = response.data.datetime;
    time = time.split('.')[0];
     time = time.replace('T', ' ');

     const date = parseISO(time);
    
     const formattedDate = format(date, 'MMM-ddd-yyyy hh:mm aaa');

    return formattedDate;
   
  } catch (error) {
    console.error(error);
  }
}
transactiondate();

async function arrangeDate() {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos');
    let time = response.data.datetime;
    time = time.split('.')[0];
     time = time.replace('T', ' ');
    return time;
  } catch (error) {
    console.error(error);
  }
}
arrangeDate();



const sellingcardPin = async (req, res) => {
    const { examType, numCodes, amount, TransactionCode, email } = req.body; 
    if (!examType || !numCodes || !amount  )return res.status(400).json({ message: " and examtype are number you want " });
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const formattedDate = await transactiondate();
    const arrangedate = await arrangeDate()
    const foundUser = await User.findOne({ refreshToken }).exec();
    
    if (!foundUser) return res.sendStatus(403);
    if(foundUser.transaction !== TransactionCode) return res.status(403).json({ "message": " incorrect transactions pin  " });
    if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " please found your wallet " });
    try {
      const time = await refrenceId();
      const dateOftran = await transactiondate();
      const foundUserBal = foundUser.walletBalance - amount;
     
    
      const codes = await Card_pin.find({ name: examType }).limit(numCodes);
  
      if (codes.length === 0) {
        return res.status(401).json({ message: 'No codes available for this exam type.' });
      }
      const notexist = await Card_pin.findOne({ name: examType }).exec()
      if(!notexist) return res.status(403).json({ message: 'No cardname available for this exam type.' })
      if(codes.length < numCodes ) return res.status(403).json({ message: 'We dont have up to card you request the ' })
      res.json(codes);
    if (examType==="WAEC" || examType==="NECO" || examType==="NABTEB") {
      const tran = await handletransaction( arrangedate, foundUser._id, time, amount, foundUserBal, `Scratch card`, foundUser.phone, `Dear Customer, You have successfully Buy ${numCodes} ${examType} . And the pin has been sent to this email ${email} `, "successful",dateOftran, `${examType} result checker`)
   
    } else {
      const tran = await handletransaction(arrangedate, foundUser._id, time, amount, foundUserBal, "Exam Pin", foundUser.phone, `Dear Customer, You have successfully Buy ${numCodes} ${examType} . And the pin has been sent to this email ${email} `, "successful", dateOftran, `${examType} Exam pin`)
   
    }
    foundUser.walletBalance = foundUserBal 
    const result = await foundUser.save() 

    let pinHtml = codes.map((pin, index) => `
  <tr style ="margin: 10px 40px; font-family: arial, sans-serif; width: 1000px">
    <td style="  font-size:18px; " >${index + 1}</td>
    <td style="  font-size:18px;">${pin.name}</td>
    <td style="  font-size:18px; ">${pin.pin}</td>
    <td style="  font-size:18px; ">${pin.seriaNo}</td>
  </tr>
`).join('');
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'waliuwaheed2021@gmail.com', 
        pass: 'onxr sqvu qtwa eblk'
      }
    });

    let mailOptions = {
      from: '"no-reply"info@abaniseedu.com', 
      to: email, 
      subject: 'Your Purchase on abanise ', 

    html: `
     
    <div style="width:80%;  display: flex; justify-self: center; border: 2px solid rgb(0, 71, 0);  border: 2px;   margin: 90px 20px; ">
    <div>
     <div class=" rappersw" style=" background-color:rgb(0, 71, 0);  border: 12px solid rgb(0, 71, 0); text-align: center; width: 100%; margin: 10px 20px;   color: white;">
       <h1  style="font-size:25px; text-align: center; font-weight:500;">abaniseedu</h1>
       <p style="font-size:15px; text-align: center; font-weight:500; ">YOUR TRANSACTION DETAILS ARE AS FOLLOWS:</p>
       <p   style="font-size:15px; text-align: center; font-weight" class=" ">Your Successful purchased  Pin</p>
       </div>
     <p style="font-size:15px; padding-left: 40px;  margin-left: 20px;">look the link below to view the entire pin you have purchase</p>
     <div style="padding-left: 40px; padding-top:40px:  margin-left: 20px;">
        <table style="width:100%;  text-align: center;" >
                 <tr style="">
                   <th class="cols">No </th>
                   <th>ExamType</th>
                   <th>Pin</th>
                  
                   <th>Seria no</th>
                 </tr>
                 <tbody >
                 ${pinHtml}
               </tbody>
               </table>
     </div>
     <p style=" margin-top: 20px; ">If you encounter any issue while using this PIN, please send a mail to  within 7 days from now.</p>
       <div class=" rappersw" style="   background-color: red;   text-align: center; width: 100%; margin: 10px 20px;   color: white;">
       <h1  style="font-size:20px; text-align: center; font-weight:500;">Thanks for your Subscription</h1>
       </div>
    </div>
 
 </div>
    `
     };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send('Error sending email.');
      return res.status(200).json({ sucess: " If an account with that email exists, a password reset link has been sent.  " });
    });

      console.log(codes);
  
      for (let code of codes) {
        await Card_pin.deleteOne({ _id: code._id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
module.exports = sellingcardPin
  