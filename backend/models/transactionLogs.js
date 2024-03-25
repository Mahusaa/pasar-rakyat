const firebaseApp = require('../config/firebaseConfig');

const storeTransactionLog = async (cashierId, paymentMethod, transactionDetails) => {
  try {
    const transactionLogsRef = firebaseApp.database().ref('transactionLogs');

    const newTransactionLogRef = transactionLogsRef.push();
    await newTransactionLogRef.set({
      cashierId,
      paymentMethod,
      transactionDetails,
      timestamp: new Date().toString(), 
    });

    return true;
  } catch (error) {
    console.error("Error storing transaction log:", error);
    return false;
  }
};

module.exports = { storeTransactionLog };
