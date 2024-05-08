const { updateStock } = require('../models/updateStock');
const { storeTransactionLog } = require('../models/transactionLogs');

const updateStockController = async (req, res) => {
  const { transactions, transactionLogs } = req.body;

  if (!Array.isArray(transactions) || !Array.isArray(transactionLogs)) {
    return res.status(400).json({ error: "Invalid data format. Expected arrays for transactions and transaction logs." });
  }

  try {
    const successTransactionLogs = []
    const insufficientStock = []

    for (const [index, transaction] of transactions.entries()) {
      const { counterId, foodId, quantity } = transaction;

      const success = await updateStock(counterId, foodId, quantity);

      if (!success) {
        insufficientStock.push(transactions[index])
        continue; 
      } else if(success){
        successTransactionLogs.push(transactions[index]);
      } else {
        return res.status(200).json({ message: "Update Error"});
      }
      
    }
    if(insufficientStock.length > 0){
      return res.status(200).json({ message: "Pembelian gagal", transactionLogs: insufficientStock });
    } else {
      await storeTransactionLog(transactionLogs, successTransactionLogs);
      return res.status(200).json({ message: "Pembelian sukses", transactionLogs: successTransactionLogs });
    }

  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { updateStockController };
