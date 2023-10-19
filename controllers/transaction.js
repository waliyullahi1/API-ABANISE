const Transaction = require('../model/Transactions'); 
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
const handletransaction = (arrangeDate, userid, referenceid, amounts, walletBalance, types, recipients, descriptions, statuses, transactionDate, value) =>{
const newTransaction = new Transaction({
  arrangeDate:arrangeDate,
  user: userid,
  amount: amounts,
  description: descriptions,
  wallet:walletBalance,
  refid:referenceid,
  recipient:recipients,
  type:types,
  value:value,
  status:statuses,
  transactionDate:transactionDate
});

newTransaction.save()
  


}


module.exports = handletransaction;
