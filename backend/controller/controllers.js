const { updateStock } = require('../models/updateStock');
const { storeTransactionLog } = require('../models/transactionLogs');

const updateStockController = async (req, res) => {
  const { transactions, transactionLogs } = req.body;

  if (!Array.isArray(transactions) || !Array.isArray(transactionLogs)) {
    return res.status(400).json({ error: "Invalid data format. Expected arrays for transactions and transaction logs." });
  }

  try {
    const successTransactionLogs = [];
    const failedTransactionLogs = [];

    for (const transaction of transactions) {
      const { counterId, foodId, quantity } = transaction;

      const success = await updateStock(counterId, foodId, quantity);

      if (!success) {
        failedTransactionLogs.push(transaction);
      } else {
        successTransactionLogs.push(transaction);
      }
    }

    if (failedTransactionLogs.length === 0) {
      await storeTransactionLog(transactionLogs, successTransactionLogs, failedTransactionLogs);
      return res.status(200).json({ 
        message: "Pembelian sukses", 
        successTransactionLogs: successTransactionLogs, 
        failedTransactionLogs: [], 
      });
    } else if (successTransactionLogs.length === 0){
      await storeTransactionLog(transactionLogs, successTransactionLogs, failedTransactionLogs);
      return res.status(200).json({ 
        message: "Pembelian gagal", 
        successTransactionLogs: [], 
        failedTransactionLogs: failedTransactionLogs, 
      });
    } else {
      await storeTransactionLog(transactionLogs, successTransactionLogs, failedTransactionLogs);
      const succesLength = successTransactionLogs.length
      const failedLength = failedTransactionLogs.length
      return res.status(200).json({ 
        message: `${succesLength} pembelian sukses dan ${failedLength} pembelian gagal`, 
        successTransactionLogs: successTransactionLogs, 
        failedTransactionLogs: failedTransactionLogs, 
      });
    }
    

  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { updateStockController };
