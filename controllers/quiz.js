const User = require('../model/quiz')
const savequiz = require('../controllers/savequiz')
const axios = require('axios')

const jwt = require("jsonwebtoken");


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

const registerNumberForQUiz = async (req, res) => {
 
  const { phoneNo } = req.body;
  if (!phoneNo) return res.status(401).json({ "message": "Username and password are required." });
  const phoneFound = await User.findOne({phone: phoneNo}).exec()
  if (phoneFound) return res.status(402).json({ message: "Your phone number has already been used before, try again next time" });
  // find if device has already been used
  const cookies = req.cookies;
  if (cookies?.quizsession) return res.status(401).json({ message: "Your device has already been used before, try again next time" });

  // create JWTs
  const refreshToken = jwt.sign(
    { phoneNo },
    process.env.REFRESH_TOKEN_SECRETY,
    { expiresIn: "5d" }
  );

  const save = await savequiz(phoneNo);

  res.cookie("quizsession", refreshToken, { 
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 10 * 24 * 60 * 60 * 4000,
  });
  res.json({ success: 'Registration successful' });
};


const givePhoneGift = async (req, res) => {
  const { phoneNo, networkType } = req.body;
  if (!phoneNo || !networkType)return res.status(400).json({ "message": "Username and password are required." });
  const phoneFound = await User.findOne({phone: phoneNo}).exec()
  if (!phoneFound) return res.status(402).json({ message: "Your phone number are already been used before, try it again next time" });
  // find if device are already been used

  const cookies = req.cookies;

  if (!cookies?.quizsession) return res.sendStatus(401).json({ message: "Your device  are already been used before, try it again next time" });
   const request_id = `${await refrenceId()}fghu3`;
 
   let networkId = '';
   switch (networkType) {
     case "MTN":
       networkId = 1;
       break;
     case "AIRTEL":
       networkId = 2;
       break;
     case "GLO":
       networkId = 3;
       break;
     case "9MOBILE":
       networkId = 4;
       break;
 
   }

   // res.json({message:networkId})
   let data = {
     "network": networkId,
     "amount": 100,
     "phone_number": phoneNo,
     "reference": request_id,
     "disable_validation": false,
     "webhook_url": "https://api-abanise-5a3s.vercel.app/sub/"
   };
 
 
   let config = {
     method: 'post',
     url: 'https://isquaredata.com/api/airtime/buy/',
     headers: {
       'Authorization': 'Basic ' + Buffer.from(process.env.AIRTIMEANDDATA_CODE).toString('base64')
     },
     data: data
   };
 
 
   try {
     const response = await axios(config);
 
     const time = await refrenceId();
     const status = response.data.status;
     const arrangedate = await arrangeDate()
   const dateOftran = await transactiondate();
 
     // if (!('status' in response.data)) {
     //   return res.status(401).json({ "message": " Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you" })
     // }
     
     console.log(status, 'status');
     if (status === "pending" || status === "successful" || status === "success" || ('status' in response.data)) {
       const newbalance = foundUser.walletBalance - amount;
       const oldbalance =foundUser.walletBalance
       foundUser.walletBalance -= amount
       const tran = await handletransaction(arrangedate, foundUser.email, time, amount, newbalance, `Airtime`, phone, `Dear Customer, You have successfully Buy ${amount} Airtime ${networkName.toUpperCase()}  For this phone number ${phone} `, 'success', dateOftran, `${networkName.toUpperCase()} Airtime`, oldbalance)
       const result = await foundUser.save()
       console.log(result, tran, newbalance, oldbalance);
      
       res.json({'success':status})
     } else { 
       const tran = await handletransaction(arrangedate, foundUser.email, time, `00.00`, foundUser.walletBalance, `Airtime`, phone, `Dear Customer, You are try to Buy ${amount} Airtime ${networkName.toUpperCase()} and is  fail try it again  thanks. `, 'failed', dateOftran, `${networkName.toUpperCase()} Airtime`)
     }
     console.log();
   } catch (error) {
     console.log(error);
     res.json({'message': 'Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you'})
      }
    
    

};

module.exports = { registerNumberForQUiz, givePhoneGift };
