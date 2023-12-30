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
  if (cookies?.quizsession2) return res.status(401).json({ message: "Your device has already been used before, try again next time" });
  if (!cookies?.quizsession2){
    const refreshToken = jwt.sign(
    { phoneNo },
    process.env.REFRESH_TOKEN_SECRETY,
    { expiresIn: "5d" }
  );
  const save = await savequiz(phoneNo);
  const questions = [
    {
      notice: 'Choose  appropriate option from the list provided',
      question: "What is location of ABANISE's tutorial lesson in iwo ?",
      choices: ["Arround Ceebee hotel area, Barika, iwo", "Opposite celestial Church, Barika filling station iwo", "Opposite Barika petrol Station iwo"],
      rightAnswer: "Opposite celestial Church, Barika filling station iwo",
      userAnswer: null,
    },
    {
      notice: 'Choose the  appropriate option from the list provided',
      question: "This below are selling product and services of ABANISE's Educational instituted  ",
      choices: ["Textbook, Cobular, Stationary", "Educational services, Computer Accessories,  Bookshop, ", "Educational services, Bookshop, Tailer, "],
      rightAnswer: "Educational services, Computer Accessories,  Bookshop",
      userAnswer: null,
    },
    {
      notice: 'Choose the  appropriate option from the list provided',
      question: "What are the Main Abanise Educational office address?",
      choices: ["Elemo's Compound along kajola road iwo", "Agoro compound's Along Kajola road iwo", "Osin's Compound, Along Kajola road iwo"],
      rightAnswer: "Agoro compound's Along Kajola road iwo",
      userAnswer: null, // This will hold the user's answer
    },
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "what is the name of ABANISE turtorial Coodinator lesson",
      choices: ["Mr ADEWOLE OSUNLOWO", "Mr OLARINWA BOLAJI ", "Mr FATAI MURITALA"],
      rightAnswer: "Mr FATAI MURITALA",
      userAnswer: null, // Thishis will hold the user's answer
    },
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE Turtorial English Teacher  ?",
      choices: ["Mr BOLAJI OLARINWA", "Mr OLADELE BOLAJI", "Mr ADEWOLE OSUNLOWO"],
      rightAnswer: "Mr OLADELE BOLAJI",
      userAnswer: null, // This will hold the user's answer
    },
    {
      notice: 'Fill the gap with appropriate option from the list provided ',
      question: "if i were ________ i would reject the offer ?",
      choices: ['himself', 'them', 'he'],
      rightAnswer: 'he',
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Complete the sentences with the correct option form the list below',
      question: "He acts ________ he were a general manger ?",
      choices: ['as', 'if', 'as if'],
      rightAnswer: 'as if',
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose the option that best complete the gap',
      question: "The book will sell in ________?",
      choices: ['hundreds of thousand ', 'a hundreds thousand ', 'hundred thousand'],
      rightAnswer: 'hundreds of thousand ',
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose the option that best complete the gap',
      question: " We are been ready to cater for  ________ ?",
      choices: ['the poor and the needy ', 'poor and needs ', 'the poor and needy'],
      rightAnswer: 'the poor and the needy',
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose the option that best complete the Question tag',
      question: " Dola has left school,  ________ ?",
      choices: ["didn't he", "has't he", "doesn't he"],
      rightAnswer: "has't he",
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose the option that best complete the Question tag',
      question: " Sola can't read,  ________  candle light.",
      choices: ["at", "to", "by"],
      rightAnswer: "by",
      userAnswer: null, // This will hold the user's answer
    },
    {
      notice: 'Choose the option that best complete the Question tag',
      question: " Sola can't read,  ________  candle light.",
      choices: ["at", "to", "by"],
      rightAnswer: "by",
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE turtorial Mathemtices Teacher  ?",
      choices: ["Mr FATAI MURITALA", "Mr OLARINWA BOLAJI ", "Mr ADEWOLE OSUNLOWO"],
      rightAnswer: "Mr FATAI MURITALA",
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE Turtorial Chemistry Teacher  ?",
      choices: ["Mr OGUNDARE SEYI", "Mr ODUNOLA SEYI", "Mr OGUNDARE AKAANI"],
      rightAnswer: "Mr OGUNDARE SEYI",
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE Turtorial Biology Teacher  ?",
      choices: ["Mr ODUNOLA SEYI", "Mr OYERINDE EMMANUEL", "Mr OYERINDE AKAANI"],
      rightAnswer: "Mr OYERINDE EMMANUEL",
      userAnswer: null, // This will hold the user's answer
    },
  
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE Turtorial Mathemtices Teacher  ?",
      choices: ["Mr FATAI MURITALA", "Mr OLARINWA BOLAJI ", "Mr ADEWOLE OSUNLOWO"],
      rightAnswer: "Mr FATAI MURITALA",
      userAnswer: null, // This will hold the user's answer
    },
    {
      notice: 'Choose  appropriate option from the list provided ',
      question: "What is the name of ABANISE Turtorial government Teacher  ?",
      choices: ["Mr IDRIS BABATUNDE", "Mr YUNUS ADEKUNLE ", "Mr IDRIS ADEKUNLE"],
      rightAnswer: "Mr IDRIS BABATUNDE",
      userAnswer: null, // This will hold the user's answer
    },
  
  ];
  res.cookie("quizsession2", refreshToken, { 
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 4 * 24 * 60 * 60 * 1000,
  });
  res.json({ success: questions });
};


  }
  // create JWTs
  

  
  
  


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

    if (!cookies?.quizsession2) {
      return res.status(401).json({ message: " something when wrong try it again" });
    }

    const request_id = `${await refrenceId()}fghu3`;

    let planing = '';
    switch (networkType) {
      case "MTN":
        planing = 2;
        break;
      case "AIRTEL":
        planing = 160;
        break;
      case "GLO":
        planing = 174;
        break;
      case "9MOBILE":
        planing = 350;
        break;
    }
    
    let data = {
      
      "plan": planing,
      "phone_number": phoneNo,
      "reference": request_id,
      "disable_validation": false,
      "webhook_url": "https://api-abanise-5a3s.vercel.app/sub/",
    };

    let config = {
      method: 'post',
      url: 'https://isquaredata.com/api/data/buy/',
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
    return res.status(401).json({ message: "sorry you have late, gift have finished" });
  }
};


module.exports = { registerNumberForQUiz, givePhoneGift };
