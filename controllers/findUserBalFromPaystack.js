const axios = require("axios");
const User = require("../model/Users");
const fund = require("../model/found");
const savenewFund = require('./fund');
const found = require("../model/found");
const { format, parseISO } = require('date-fns')


const getCustomerIdByAccountNumber = async (accountNumber) => {

  const url = `https://api.paystack.co/customer?account_number=${accountNumber}`;
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRETY_CODE}`,
    "Content-Type": "application/json",
  };
  
  try {
    const response = await axios.get(url, { headers: headers });
    const customerId = response.data.data[0].id;
    console.log(
      `The customer ID for account number ${accountNumber} is ${customerId}`
    );
    return customerId;
  } catch (error) {
    console.error(error);
  }
};



const getCustomerByAccountNumber = async (customeracc) => {
  
   const foundUser = await User.findOne({ account_number: customeracc }).exec();
  if (!foundUser) return res.sendStatus(403);
  
  const customerId = await getCustomerIdByAccountNumber(customeracc);
  const response = await axios.get('https://api.paystack.co/transaction', {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRETY_CODE}` },
    params: { customer: customerId }
  });

  const userId = foundUser._id;
  const lastTransaction = await fund.findOne({ user:userId }).sort({transactionDate: -1}).limit(1);
  const lastTransactionId = lastTransaction ? lastTransaction.transactionId : 0;
  let total = 0;

  for (const transaction of response.data.data) {
    if (transaction.status === 'success') {
      const existingTransaction = await fund.findOne({ transactionId: transaction.id });
      if (!existingTransaction) {
         console.log(foundUser._id, transaction.customer.id, transaction.amount, transaction.status,transaction.authorization.card_type, transaction.id,  new Date(transaction.createdAt));
         const date = parseISO(transaction.createdAt);
         const tran = await savenewFund(foundUser.email , transaction.customer.id, transaction.amount, transaction.status,transaction.authorization.card_type, transaction.id,  new Date(transaction.createdAt), format(date, 'MMM, ddd, yyyy hh:mm aaa'));
          console.log(lastTransaction);
        if (transaction.id > lastTransactionId) {
          let amount = (transaction.amount / 100) - 50; // convert from kobo to naira and remove charges 
          total += amount;
          console.log(amount);
         
        }

      }
              
    }
  }




console.log(total);
 
  return total; 
}




module.exports = getCustomerByAccountNumber;

