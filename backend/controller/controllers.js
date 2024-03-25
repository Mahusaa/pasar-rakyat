const { updateStock } = require('../models/updateStock');
const { storeTransactionLog } = require('../models/transactionLogs');

const updateStockController = async (req, res) => {
  const { transactions, transactionLogs } = req.body;

  if (!Array.isArray(transactions) || !Array.isArray(transactionLogs)) {
    return res.status(400).json({ error: "Invalid data format. Expected arrays for transactions and transaction logs." });
  }

  try {
    const updatedTransactionLogs = [];

    for (const [index, transaction] of transactions.entries()) {
      const { counterId, foodId, quantity } = transaction;

      const success = await updateStock(counterId, foodId, quantity);

      if (!success) {
        updatedTransactionLogs.push({
          error: "Stock tidak cukup atau Error saat update stok",
          transaction: transactions[index],
        });
        continue; 
      }

      const log = transactionLogs[index];
      if (!log || !log.cashierId || !log.paymentMethod || !log.transactionDetails) {
        console.error("Invalid transaction log:", log);
        continue; // Skip this iteration if transaction log is invalid
      }

      updatedTransactionLogs.push(log);

      await storeTransactionLog(log.cashierId, log.paymentMethod, log.transactionDetails);
    }

    return res.status(200).json({ message: "Update complete.", transactionLogs: updatedTransactionLogs });
  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { updateStockController };
