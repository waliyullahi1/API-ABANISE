const axios = require("axios");

async function getLastTransactionIdFromPaystack(customerId) {
  const url = `https://api.paystack.co/transaction?customer=${customerId}`;
  const headers = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers: headers });
    const transactions = response.data.data;

    if (transactions.length > 0) {
      // Sort transactions by ID in descending order
      transactions.sort((a, b) => b.id - a.id);

      // Return the ID of the last transaction
      return transactions[0].id;
    } else {
      // Return a default value if the customer has no transactions
      return '0';
    }
  } catch (error) {
    console.error(error);
  }
}


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
    let lastTransactionId = await getLastTransactionId(customerId); // You need to implement this function

    transactions.forEach((transaction) => {
      if (transaction.status === "success" && transaction.id > lastTransactionId) {
        balance += transaction.amount / 100;
        lastTransactionId = Math.max(lastTransactionId, transaction.id);
      }
    });

    console.log(`The balance of all new transactions for ${customerId} is ${balance}`);
    
    await saveLastTransactionId(customerId, lastTransactionId); // You need to implement this function

    return balance;
  } catch (error) {
    console.error(error);
  }
};




module.exports = getCustomerByAccountNumber;

