const axios = require('axios')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')
const { format, parseISO } = require('date-fns')


const url = "https://sandbox.vtpass.com/api/pay"
const headers = {
    "Content-Type":"application/json",
    "api-key":"a010d9cbacb589344f35db21e847ff1d",
    "secret-key":"SK_80164128cd3835d08dc2173e9f7004204145c2ce010"
};
const hours = "14"



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



const airtimeForAllNewtwork = async (req, res) =>{
   
     const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(401);
const refreshToken = cookies.jwt;

const foundUser = await User.findOne({ refreshToken }).exec();

if (!foundUser) return res.sendStatus(403);

    const { serviceID, amount, phone, TransactionCode,  } = req.body;
        const request_id = `${await refrenceId()}fghu3`;
        
        if(foundUser.transaction !== TransactionCode) return res.status(401).json({ "message": " incorrect transactions pin  " });
    if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " insufficient balance  " });
    const data = {
       'request_id':request_id,
        'serviceID': serviceID,
        'billersCode': phone, 
        'amount': amount, 
        'phone': phone,
        
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
        res.json(response.data)
        const time = await refrenceId();
        const dateOftran = await transactiondate();
        const status = response.data.response_description ;
        const arrangedate = await arrangeDate()
        
        
               
         if (status === "TRANSACTION SUCCESSFUL" || status === "TRANSACTION IS PROCESSING ") {
          const foundUserBal = foundUser.walletBalance - amount;
              const tran = await handletransaction(arrangedate, foundUser._id, time, amount, foundUserBal, `Airtime`, phone, `Dear Customer, You have successfully Buy ${amount} Airtime ${ serviceID.toUpperCase()}  For this phone number ${phone} `, 'successfull', dateOftran, `${ serviceID.toUpperCase()} Airtime`)
          const result = await foundUser.save() 
         } else {
          const tran = await handletransaction(arrangedate, foundUser._id, time,`00.00`, foundUser.walletBalance, `Airtime`, phone, `Dear Customer, You are try to Buy ${amount} Airtime ${ serviceID.toUpperCase()} and is  fail try it again  thanks. `, 'failed', dateOftran, `${serviceID.toUpperCase()} Airtime`)
        }
        

    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }    
    
   console.log('result');
}


const dataBundleForAllNewtwork = async (req, res) =>{
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  
  const foundUser = await User.findOne({ refreshToken }).exec();
  
  if (!foundUser) return res.sendStatus(403);


    const { serviceID, amount, phone, billersCode, variation_code,  TransactionCode, datatype} = req.body;

        const request_id = `${await refrenceId()}fghu3`;
        if(foundUser.transaction !== TransactionCode) return res.status(403).json({ "message": " incorrect transactions pin  " });
 
    if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " please found your wallet " });
 
    
    const data = {
      request_id:request_id, 
      serviceID: serviceID,
      billersCode: billersCode, 
      variation_code:variation_code,// 'mtn-10mb-100', 
      amount: amount, 
      phone: phone
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
        const time = await refrenceId();
        const dateOftran = await transactiondate();
        const status = response.data.response_description ;
        const foundUserBal = foundUser.walletBalance - amount;
        console.log(response.data.response_description, );  
        res.json(response.data)
        const arrangedate = await arrangeDate()
        if (status === "TRANSACTION SUCCESSFUL" || status === "TRANSACTION IS PROCESSING ") {
          const tran = await handletransaction(arrangedate, foundUser._id, time, amount, foundUserBal, `Data Bundle`, phone, `Dear Customer, You have successfully Buy ${datatype} data bundle  For this phone number ${phone} `, status, dateOftran, `${ serviceID.toUpperCase()} Airtime`)
           
          const result = await foundUser.save() 
         } else {
          const tran = await handletransaction(arrangedate, foundUser._id, time, amount, foundUserBal, `Data Bundle`, phone, `Dear Customer, You are try to shared ${datatype} Data to  ${phone} and is not successfull try it again thanks.`, 'failed', dateOftran, `${serviceID.toUpperCase()} Airtime`)
        }
        


    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }    
    
}



module.exports = {airtimeForAllNewtwork, dataBundleForAllNewtwork}
