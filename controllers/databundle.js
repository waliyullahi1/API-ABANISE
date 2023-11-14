const axios = require('axios')
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const handletransaction = require('./transaction')
const { format, parseISO } = require('date-fns')





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



const airtimeForAllNewtwork = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403);

  const { networkName, amount, phone, TransactionCode, } = req.body;
 
  const request_id = `${await refrenceId()}fghu3`;
  if ( !amount || !networkName|| !phone|| !TransactionCode)return res.status(400).json({ "message": "Username and password are required." });
 if (foundUser.transaction !== TransactionCode) return res.status(401).json({ "message": " incorrect transactions pin  " });
  if (foundUser.walletBalance < amount) return res.status(403).json({ "message": " insufficient balance  " });
  if (String(phone).length < 11 ||  String(phone).length > 11) return res.status(403).json({ "message": " Incorrect phone Number " });
  if (networkName != 'MTN' && networkName != 'AIRTEL' && networkName != 'GLO' && networkName != '9MOBILE') return res.status(400).json({ "message": " networkname is  " });
       const dateOftran = await transactiondate();
 

  let networkId = '';
  switch (networkName) {
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
  console.log(networkId,networkName );
  res.json({message:networkId})
  // let data = {
  //   "network": networkId,
  //   "amount": amount,
  //   "phone_number": phone,
  //   "reference": request_id,
  //   "disable_validation": false,
  //   "webhook_url": "https://www.abaniseedu.com"
  // };


  // let config = {
  //   method: 'post',
  //   url: 'https://isquaredata.com/api/airtime/buy/',
  //   headers: {
  //     'Authorization': 'Basic ' + Buffer.from(process.env.AIRTIMEANDDATA_CODE).toString('base64')
  //   },
  //   data: data
  // };


  // try {
  //   const response = await axios(config);

  //   const time = await refrenceId();
  //   const status = response.data.status;
  //   const arrangedate = await arrangeDate()
  // const dateOftran = await transactiondate();

  //   // if (!('status' in response.data)) {
  //   //   return res.status(401).json({ "message": " Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you" })
  //   // }
    
  //   console.log(foundUser.walletBalance);
  //   if (status === "pending" || status === "successful" || status === "success" || ('status' in response.data)) {
  //     const newbalance = foundUser.walletBalance - amount;
  //     const oldbalance =foundUser.walletBalance
  //     const tran = await handletransaction(arrangedate, foundUser.email, time, amount, newbalance, `Airtime`, phone, `Dear Customer, You have successfully Buy ${amount} Airtime ${networkName.toUpperCase()}  For this phone number ${phone} `, 'success', dateOftran, `${networkName.toUpperCase()} Airtime`, oldbalance)
  //     const result = await foundUser.save()
  //     console.log(result, tran, newbalance, oldbalance);
  //     console.log(response);
  //     res.json({message:response.data.status})
  //   } else { 
  //     const tran = await handletransaction(arrangedate, foundUser.email, time, `00.00`, foundUser.walletBalance, `Airtime`, phone, `Dear Customer, You are try to Buy ${amount} Airtime ${networkName.toUpperCase()} and is  fail try it again  thanks. `, 'failed', dateOftran, `${networkName.toUpperCase()} Airtime`)
  //   }
  //   console.log();
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send('Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you');
  // }

}


// const airtimeForAllNewtwork = async (req, res) =>{

//      const cookies = req.cookies;
// if (!cookies?.jwt) return res.sendStatus(401);
// const refreshToken = cookies.jwt;

// const foundUser = await User.findOne({ refreshToken }).exec();

// if (!foundUser) return res.sendStatus(403);

//     const { serviceID, amount, phone, TransactionCode,  } = req.body;
//         const request_id = `${await refrenceId()}fghu3`;

//         if(foundUser.transaction !== TransactionCode) return res.status(401).json({ "message": " incorrect transactions pin  " });
//     if(foundUser.walletBalance < amount) return res.status(403).json({ "message": " insufficient balance  " });
//     var axios = require('axios');
// var data = {   "network": 1,
//    "amount": 50.0,
//        "phone_number": "08163588242",
//            "reference": "SDFGFD",   
//             "disable_validation": false,
//                 "webhook_url": "https://webhook.site/cf196551-0879-4c7e-adf3-514765618730"
//         };

// var config = {
//   method: 'post',
// maxBodyLength: Infinity,
//   url: 'https://isquaredata.com/api/airtime/buy/',
//   headers: {
//     Username:'08166988715',
//     Password:'Waliu1234'
//    },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

//     const data = {
//        'request_id':request_id,
//         'serviceID': serviceID,
//         'billersCode': phone, 
//         'amount': amount, 
//         'phone': phone,

//     }

//     try {
//         const response = await axios.post(url, data, {headers:headers});
//         res.json(response.data)
//         const time = await refrenceId();
//         const dateOftran = await transactiondate();
//         const status = response.data.response_description ;
//         const arrangedate = await arrangeDate()



//          if (status === "TRANSACTION SUCCESSFUL" || status === "TRANSACTION IS PROCESSING ") {
//           const foundUserBal = foundUser.walletBalance - amount;
//               const tran = await handletransaction(arrangedate, foundUser._id, time, amount, foundUserBal, `Airtime`, phone, `Dear Customer, You have successfully Buy ${amount} Airtime ${ serviceID.toUpperCase()}  For this phone number ${phone} `, 'successfull', dateOftran, `${ serviceID.toUpperCase()} Airtime`)
//           const result = await foundUser.save() 
//          } else {
//           const tran = await handletransaction(arrangedate, foundUser._id, time,`00.00`, foundUser.walletBalance, `Airtime`, phone, `Dear Customer, You are try to Buy ${amount} Airtime ${ serviceID.toUpperCase()} and is  fail try it again  thanks. `, 'failed', dateOftran, `${serviceID.toUpperCase()} Airtime`)
//         }


//     } catch (error) {
//         console.error(error)
//         res.status(500).send('An error occurred while processing your request.')
//     }    

//    console.log('result');
// }

const dataBundleForAllNewtwork = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403);


  const { plan, amount, networkName, phone, TransactionCode, datatype } = req.body;
  if (!plan || !amount || !networkName|| !phone|| !TransactionCode|| !datatype)return res.status(400).json({ "message": "Username and password are required." });

  if (foundUser.transaction !== TransactionCode) return res.status(403).json({ "message": " incorrect transactions pin  " });
  const request_id = `${await refrenceId()}fghu3`;
  const arrangedate = await arrangeDate()

  let originalAmount = '';

  switch (plan) {
    //Mtn sme data (10gb-168, 1gb-2, 2gb-3, 3gb-4, 500mb-1,5gb-5  )

    case 168://10GB
      originalAmount = 2300;
      break;
    case 2://1GB
      originalAmount = 230;
      break;
    case 3://2GB
      originalAmount = 460;
      break;
    case 4://3GB
      originalAmount = 690;
      break;
    case 1://500MB
      originalAmount = 150;
      break;
    case 5://5GB
      originalAmount = 1250;
      break;
    //Mtn corporate data (10gb-18, 1gb-14, 2gb-15, 3gb-16, 500mb-13,5gb-17  )
    case 18://10GB
      originalAmount = 2500;
      break;
    case 14://1GB
      originalAmount = 250;
      break;
    case 15://2GB
      originalAmount = 500;
      break;
    case 16://3GB
      originalAmount = 750;
      break;
    case 13://500MB
      originalAmount = 150;
      break;
    case 17://5GB
      originalAmount = 1250;
      break;

    //Airtel corporate data (100MB-157, 1gb-160, 2gb-161, 3gb-16, 500mb-159,5gb-162  )
    case 157://100MB 7DAYS
      originalAmount = 55;
      break;
      case 158://300MB 7DAYS
      originalAmount = 100;
      break;
    case 160://1GB MONTHLY
      originalAmount = 250;
      break;
    case 161://2GB MONTHLY
      originalAmount = 500;
      break;
    case 159://500MB MONTHLY
      originalAmount = 150;
      break;
    case 162://5GB MONTHLY
      originalAmount = 1250;
      break;

    //Glo corporate data (500MB-173, 1gb-	174, 2gb-175, 3gb-176, 500mb-159,5gb-177  )
    case 173://500MB MONTHLY
      originalAmount = 155;
      break;
      case 172://200MB  14days
      originalAmount = 80;
      break;
    case 174://1GB MONTHLY
      originalAmount = 250;
      break;
    case 175://2GB MONTHLY	
      originalAmount = 500;
      break;
    case 176://3GB MONTHLY
      originalAmount = 750;
      break;
    case 177://5GB MONTHLY
      originalAmount = 1250;
      break;

    //9MOBILE SME DATA (1.5gb-106, 1gb-	105, 2gb-107, 3gb-108, 500mb-104,5gb-17  )
    case 106: //1.5gb
      originalAmount = 525;
      break;
    case 105://1gb
      originalAmount = 350;
      break;
    case 107://2GB SME
      originalAmount = 700;
      break;
    case 108://3GB SME
      originalAmount = 1050;
      break;
    case 104://500MB SME 14days
      originalAmount = 220;
      break;
    case 109://5GB
      originalAmount = 1550;
      break;

    //9MOBILE CORPORATE DATA (10gb-188, 1gb-180, 2gb-181, 3gb-182, 500mb-179,5gb-184  )

    case 188://10GB MONTHLY
      originalAmount = 2300;
      break;
    case 180://1GB
      originalAmount = 160;
      break;
    case 181://2GB
      originalAmount = 320;
      break;
    case 182://3GB
      originalAmount = 480;
      break;
    case 179://500MB
      originalAmount = 100;
      break;
    case 184://5GB
      originalAmount = 800;
      break 
      default:
        originalAmount = 0;
        break;
  }
  if (foundUser.walletBalance < originalAmount) return res.status(403).json({ "message": " please found your wallet " });
  console.log(originalAmount);

  let data = {
    "plan": 1,
    "phone_number": phone,
    "reference": request_id,
    "disable_validation": false,
    "webhook_url": "https://webhook.site/0879-4c7e-adf3-514765618730"
}
  
 


  let config = {
    method: 'post',
    url: 'https://isquaredata.com/api/data/buy/',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.AIRTIMEANDDATA_CODE).toString('base64')
    },
    data: data
  }
 


  try {
    let originalAmount = '';

    switch (plan) {
      //Mtn sme data (10gb-168, 1gb-2, 2gb-3, 3gb-4, 500mb-1,5gb-5  )

      case 168://10GB
        originalAmount = 2300;
        break;
      case 2://1GB
        originalAmount = 230;
        break;
      case 3://2GB
        originalAmount = 460;
        break;
      case 4://3GB
        originalAmount = 690;
        break;
      case 1://500MB
        originalAmount = 150;
        break;
      case 5://5GB
        originalAmount = 1150;
        break;
      //Mtn corporate data (10gb-18, 1gb-14, 2gb-15, 3gb-16, 500mb-13,5gb-17  )
      case 18://10GB
        originalAmount = 2500;
        break;
      case 14://1GB
        originalAmount = 250;
        break;

      case 15://2GB
        originalAmount = 500;
        break;

      case 16://3GB
        originalAmount = 750;
        break;

      case 13://500MB
        originalAmount = 125;
        break;

      case 17://5GB
        originalAmount = 1250;
        break;

      //Airtel corporate data (100MB-157, 1gb-160, 2gb-161, 3gb-16, 500mb-159,5gb-162  )
      case 157://100MB 7DAYS
        originalAmount = 50;
        break;
      case 160://1GB MONTHLY
        originalAmount = 250;
        break;

      case 161://2GB MONTHLY
        originalAmount = 500;
        break;

      case 159://500MB MONTHLY
        originalAmount = 150;
        break;

      case 162://5GB MONTHLY
        originalAmount = 1250;
        break;

      //Glo corporate data (500MB-173, 1gb-	174, 2gb-175, 3gb-176, 500mb-159,5gb-177  )
      case 173://500MB MONTHLY
        originalAmount = 155;
        break;
      case 174://1GB MONTHLY
        originalAmount = 250;
        break;

      case 175://2GB MONTHLY	
        originalAmount = 500;
        break;



      case 176://3GB MONTHLY
        originalAmount = 750;
        break;

      case 177://5GB MONTHLY
        originalAmount = 1250;
        break;

      //9MOBILE SME DATA (1.5gb-106, 1gb-	105, 2gb-107, 3gb-108, 500mb-104,5gb-17  )
      case 106: //1.5gb
        originalAmount = 525;
        break;
      case 105://1gb
        originalAmount = 350;
        break;

      case 107://2GB SME
        originalAmount = 700;
        break;



      case 108://3GB SME
        originalAmount = 1050;
        break;

      case 104://500MB SME 14days
        originalAmount = 220;
        break;

      case 109://5GB
        originalAmount = 1550;
        break;

      //9MOBILE CORPORATE DATA (10gb-188, 1gb-180, 2gb-181, 3gb-182, 500mb-179,5gb-184  )

      case 188://10GB MONTHLY
        originalAmount = 2300;
        break;
      case 180://1GB
        originalAmount = 160;
        break;
      case 181://2GB
        originalAmount = 320;
        break;
      case 182://3GB
        originalAmount = 480;
        break;
      case 179://500MB
        originalAmount = 100;
        break;
      case 184://5GB
        originalAmount = 800;
    }
    const response = await axios(config);

    const time = await refrenceId();
    const status = response.data.status;
    const arrangedate = await arrangeDate()
  const dateOftran = await transactiondate();


    // if (!('status' in response.data)) {
    //   return res.status(401).json({ "message": " Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you" })
    // }
    
    if (status === "pending" || status === "successful" || status === "success" || ('status' in response.data)) {
      const newbalance = foundUser.walletBalance - amount;
      const oldbalance =foundUser.walletBalance
     
      const tran = await handletransaction(arrangedate, foundUser.email, time, originalAmount, newbalance, `Data Bundle`, phone, `Dear Customer, You have successfully Buy ${datatype} Airtime ${networkName.toUpperCase()}  For this phone number ${phone} `, 'success', dateOftran, `${networkName.toUpperCase()} Data Bundle`, oldbalance)
       const result = await foundUser.save()
      
       console.log(response);
       res.json({message:response.data.status})
    } else {
      const tran = await handletransaction(arrangedate, foundUser.email, time, `00.00`, foundUser.walletBalance, `Data Bundle `, phone, `Dear Customer, You are try to Buy ${datatype} Airtime ${networkName.toUpperCase()} and is  fail try it again  thanks. `, 'failed', dateOftran, `${networkName.toUpperCase()} Data Bundle`, oldbalance)
    }
    console.log();
  } catch (error) {
    console.log(error);
    res.status(500).send('Sorry try it again later, and i will like you if you can help me call this number 07068393706 or text on whatsapp and tell her what problem you are facing, thanks you');
  }
}



module.exports = { airtimeForAllNewtwork, dataBundleForAllNewtwork }
