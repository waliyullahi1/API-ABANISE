const Transaction = require('../model/Transactions'); 
const handletransaction = (userid, referenceid, amounts, walletBalance, types, recipients, descriptions, statuses, transactionDate) =>{
const newTransaction = new Transaction({
  user: userid,
  amount: amounts,
  description: descriptions,
  wallet:walletBalance,
  refid:referenceid,
  recipient:recipients,
  type:types,
  status:statuses,
  transactionDate:transactionDate
});

newTransaction.save()
  


}


module.exports = handletransaction;
