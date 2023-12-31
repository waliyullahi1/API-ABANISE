const Card_pin = require('../model/cards')
const User = require("../model/Users");


const axios = require("axios");
const { format, parseISO } = require('date-fns')
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



const scratchCard = async (req, res) => {
    const { examType, numCodes, amount, email, refreshToken } = req.body; 
    if (!examType || !numCodes || !email || !amount  || !refreshToken )return res.status(400).json({ message: " and examtype are number you want " });

    if(refreshToken !== process.env.REFRESH_TOKEN_SECRETY) return res.status(403).json({ "message": " incorrect transactions pin  " });
        try {
      const time = await refrenceId();
      const dateOftran = await transactiondate();
     
      const codes = await Card_pin.find({ name: examType }).limit(numCodes);
  
      if (codes.length === 0) {
        return res.status(401).json({ message: 'No codes available for this exam type.' });
      }
      const notexist = await Card_pin.findOne({ name: examType }).exec()
      let totalAmount = codes.reduce((total, item) => total + item.amount, 0)

      if(totalAmount > amount ) return res.status(403).json({ message: 'An error occurs  ' })

      if(!notexist) return res.status(403).json({ message: 'No cardname available for this exam type.' })
      
      if(codes.length < numCodes ) return res.status(403).json({ message: 'We dont have up to card you request the ' })
      const emails = await sendmessage(email, codes)
      res.json(codes);
      for (let code of codes) {
        await Card_pin.deleteOne({ _id: code._id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
};
module.exports = scratchCard