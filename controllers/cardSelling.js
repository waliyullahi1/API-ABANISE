
const Card_pin = require('../model/cards')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')
const axios = require("axios");
const { format, parseISO } = require('date-fns')
const nodemailer = require('nodemailer');
const sendmessage =require('./sendmessage')
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
      const newbalance = foundUser.walletBalance - amount;
      const oldbalance =foundUser.walletBalance
     
    
      const codes = await Card_pin.find({ name: examType }).limit(numCodes);
  
      if (codes.length === 0) {
        return res.status(401).json({ message: 'No codes available for this exam type.' });
      }
      const notexist = await Card_pin.findOne({ name: examType }).exec()
      if(!notexist) return res.status(403).json({ message: 'No cardname available for this exam type.' })
      if(codes.length < numCodes ) return res.status(403).json({ message: 'We dont have up to card you request the ' })
      
    if (examType==="WAEC" || examType==="NECO" || examType==="NABTEB") {
      const tran = await handletransaction( arrangedate, foundUser.email, time, amount, newbalance, `Scratch card`, foundUser.phone, `Dear Customer, You have successfully Buy ${numCodes} ${examType} . And the pin has been sent to this email ${email} `, "successful",dateOftran, `${examType} result checker`, oldbalance)
      
      const emails = await sendmessage(email, codes)
    } else {
      const tran = await handletransaction(arrangedate, foundUser.email, time, amount, newbalance, "Exam Pin", foundUser.phone, `Dear Customer, You have successfully Buy ${numCodes} ${examType} . And the pin has been sent to this email ${email} `, "successful", dateOftran, `${examType} Exam pin`, oldbalance)
      const emails = await sendmessage(email, codes)
    }
    foundUser.walletBalance = foundUserBal 
    const result = await foundUser.save() 

 

    

 

      
      res.json(codes);
      for (let code of codes) {
        await Card_pin.deleteOne({ _id: code._id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
module.exports = sellingcardPin
  