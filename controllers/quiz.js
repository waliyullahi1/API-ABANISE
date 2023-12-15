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
  try {
    const { phoneNo, networkType } = req.body;

    if (!phoneNo || !networkType) {
      return res.status(400).json({ "message": "Username and password are required." });
    }

    const phoneFound = await User.findOne({phone: phoneNo}).exec();

    if (!phoneFound) {
      return res.status(402).json({ message: "Your phone number has already been used before, try again next time" });
    }

    const cookies = req.cookies;

    if (!cookies?.quizsession) {
      return res.status(401).json({ message: "Your device has already been used before, try again next time" });
    }

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

    let data = {
      "network": networkId,
      "amount": 100,
      "phone_number": phoneNo,
      "reference": request_id,
      "disable_validation": false,
      "webhook_url": "https://api-abanise-5a3s.vercel.app/sub/",
    };

    let config = {
      method: 'post',
      url: 'https://isquaredata.com/api/airtime/buy/',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.AIRTIMEANDDATA_CODE).toString('base64')
      },
      data: data
    };

    const response = await axios(config);

    const time = await refrenceId();
    const status = response.data.status;

    return res.json({ success: ` successful collect gift `});
  } catch (error) {
    console.log(error);
    return res.json({'message': 'Sorry try it again later, and I would appreciate it if you could call this number 07068393706 '});
  }
};


module.exports = { registerNumberForQUiz, givePhoneGift };
