const Transaction = require('../model/Transactions'); 
const handletransaction = (userid, amounts, descriptions) =>{
const newTransaction = new Transaction({
  user: userid,
  amount: amounts,
  description: descriptions,
});

newTransaction.save()
  


}


module.exports = handletransaction;
