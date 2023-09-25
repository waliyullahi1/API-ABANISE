
const Card_pin = require('../model/cards')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')
const axios = require("axios");

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
    return time;
  } catch (error) {
    console.error(error);
  }
}
transactiondate();



const sellingcardPin = async (req, res) => {
    const { examType, numCodes, amount } = req.body; 
    if (!examType || !numCodes || !amount  )return res.status(400).json({ message: " and examtype are number you want " });
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    
    if (!foundUser) return res.sendStatus(403);
    if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " please found your wallet " });
    try {
      const time = await refrenceId();
      const dateOftran = await transactiondate();
      const foundUserBal = foundUser.walletBalance - amount;
     
    
      const codes = await Card_pin.find({ name: examType }).limit(numCodes);
  
      if (codes.length === 0) {
        return res.status(404).json({ message: 'No codes available for this exam type.' });
      }
      const notexist = await Card_pin.findOne({ name: examType }).exec()
      if(!notexist) return res.status(403).json({ message: 'No cardname available for this exam type.' })
      if(codes.length < numCodes ) return res.status(403).json({ message: 'We dont have up to card you request the ' })
      res.json(codes);
    const tran = await handletransaction(foundUser._id, time, amount, foundUserBal, `${examType}`, foundUser.phone, `Buy ${numCodes} ${examType}`, "successful",dateOftran)
    foundUser.walletBalance = foundUserBal 
    const result = await foundUser.save() 
      for (let code of codes) {
        await Card_pin.deleteOne({ _id: code._id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
module.exports = sellingcardPin
  