const Found = require('../model/found'); 
const axios = require('axios')




const savenewFund = (email, customerId, amounts, status, transactionType, transactionId, timestamp, dateShow) =>{
  
const newFund = new Found({
  transactionId: transactionId,
  dateShow:dateShow,
  email:email,
  customerId:customerId,
  amount: amounts / 100, // convert from kobo to naira
  transactionType:transactionType,
  timestamp: timestamp,
  status: status
});

newFund.save()
  


}


module.exports = savenewFund;