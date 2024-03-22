const { updateStock } = require('../models/data');

const updateStockController = async (req, res) => {
  const transactions = req.body;
  console.log(transactions);

  // Check if transactions is not an array
  if (!Array.isArray(transactions)) {
    return res.status(400).json({ error: "Invalid transactions data format. Expected an array." });
  }

  const transactionLogs = []; // Array to store transaction logs

  try {
    // Iterate over each transaction in the array
    for (const transaction of transactions) {
      const { cashierId, foodId, quantity } = transaction;

      // Call the updateStock function to update the stock
      const success = await updateStock(cashierId, foodId, quantity);

      if (!success) {
        transactionLogs.push({
          error: "Insufficient stock or error occurred while updating stock.",
          transaction,
        });
        continue; 
      }

      // If the transaction was successful, log it
      transactionLogs.push({
        message: "Stock updated successfully.",
        transaction,
      });
    }

    // Send a response with the transaction logs
    return res.status(200).json({ message: "Update complete.", transactionLogs });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating stock:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { updateStockController };
