const axios = require('axios')
const {format} = require('date-fns')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')



const url = "https://sandbox.vtpass.com/api/pay"
const headers = {
    "Content-Type":"application/json",
    "api-key":"a010d9cbacb589344f35db21e847ff1d",
    "secret-key":"SK_80164128cd3835d08dc2173e9f7004204145c2ce010"
};
const hours = "14"





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



const airtimeForAllNewtwork = async (req, res) =>{
  
    const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(401);
const refreshToken = cookies.jwt;

const foundUser = await User.findOne({ refreshToken }).exec();

if (!foundUser) return res.sendStatus(403);

    const { serviceID, amount, phone } = req.body;
        const request_id = `${await refrenceId()}fghu3`;
    
    if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " go and found your wallet " });
    const data = {
       'request_id':request_id,
        'serviceID': serviceID,
        'billersCode': phone, 
        'amount': amount, 
        'phone': phone
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
        res.json(response.data)
        const time = await refrenceId();
        const dateOftran = await transactiondate();
        const status = response.data.response_description ;
        const foundUserBal = foundUser.walletBalance;
        console.log(foundUserBal)
       
        console.log(foundUser._id, request_id, amount, '333', serviceID, phone, serviceID, status, dateOftran)
        
         if (status === "TRANSACTION SUCCESSFUL") {
          const tran = await handletransaction(foundUser._id, time, amount, foundUserBal, serviceID, phone, serviceID, "successful",dateOftran) 
         } else {
          const tran = await handletransaction(foundUser._id, time, amount, foundUserBal, serviceID, phone, serviceID, "failed",dateOftran) 
        }
        

    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }    
    
   console.log('result');
}


const dataBundleForAllNewtwork = async (req, res) =>{
    const { serviceID, amount, phone,billersCode, variation_code,} = req.body;
    console.log('result');
    // const date = format(now, 'yyyyMMddHHmmss') 
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Africa/Lagos');
    const now = new Date();
    const id = `${format(now, 'yyyyMMdd')}${hours}${format(now, 'mmss')}fkj2`
    
    const data = {
      request_id:id, 
      serviceID: serviceID,
      billersCode: billersCode, 
      variation_code:variation_code,// 'mtn-10mb-100', 
      amount: amount, 
      phone: phone
    }

    try {
        const response = await axios.post(url, data, {headers:headers});
        console.log(response.data.response_description, );  
        res.json(response.data)
        

    } catch (error) {
        console.error(error)
        res.status(500).send('An error occurred while processing your request.')
    }    
    
}



module.exports = {airtimeForAllNewtwork, dataBundleForAllNewtwork}
