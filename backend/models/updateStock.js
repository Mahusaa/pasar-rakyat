const firebaseApp = require('../config/firebaseConfig');

const updateStock = async (counterId, foodId, quantity) => {
  try {
    const db = firebaseApp.database();
    const counterIndex = parseInt(counterId) - 1;
    const foodIndex = parseInt(foodId) - 1;

    const foodRef = db.ref(`menu/${counterIndex}/foods/${foodIndex}`);

    const snapshot = await foodRef.once('value');

    if (snapshot.exists()) {
      const currentStock = snapshot.val().stock;
      const newStock = currentStock - quantity;

      if (newStock >= 0) {
        await foodRef.update({ stock: newStock });
        return true; 
      } else {
        console.log("Stock tidak cukup");
        return false; 
      }
    } else {
      return { error: "Makanan tidak ada" }; 
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    return false; 
  }
};

module.exports = { updateStock };