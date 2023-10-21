const Found = require('../model/found'); 
const axios = require('axios')

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


const savenewFund = (userid, customerId, amounts, status, transactionType, transactionId, timestamp) =>{
    const arrangeDate = transactiondate()
const newFund = new Found({
  transactionId: transactionId,
  user:userid,
  customerId:customerId,
  amount: amounts / 100, // convert from kobo to naira
  transactionType:transactionType,
  timestamp: timestamp,
  status: status
});

newFund.save()
  


}


module.exports = savenewFund;