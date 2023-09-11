const axios = require("axios");

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
  
  const customerId = await getCustomerIdByAccountNumber(customeracc);

  const url = `https://api.paystack.co/transaction?customer=${customerId}`;
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRETY_CODE}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers: headers });
    const transactions = response.data.data;
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.status === "success") {
        balance += transaction.amount / 100;
      }
    });
    console.log(
      `The balance of all transactions for ${customerId} is ${balance}`
    );
    return balance;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getCustomerByAccountNumber;

