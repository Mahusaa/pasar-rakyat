const firebaseApp = require('../config/firebaseConfig');

const updateStock = async (counterId, foodId, quantity) => {
  try {
    const db = firebaseApp.database();
    const counterIndex = parseInt(counterId) - 1;
    const foodIndex = parseInt(foodId) - 1;

    const foodRef = db.ref(`menu/${counterIndex}/foods/${foodIndex}`);

    const snapshot = await foodRef.once('value');
    console.log("Snapshot:", snapshot.val());

    if (snapshot.exists()) {
      const currentStock = snapshot.val().stock;
      const newStock = currentStock - quantity;
      console.log("New stock:", newStock);

      if (newStock >= 0) {
        await foodRef.update({ stock: newStock });
        return true; 
      } else {
        console.log("Insufficient stock.");
        return false; 
      }
    } else {
      console.log("Snapshot does not exist.");
      return { error: "Food item not found." }; // Return a specific error for non-existing item
    }
  } catch (error) {
    console.error("Error updating stock:", error);
    return false; // Error occurred while updating stock
  }
};

module.exports = { updateStock };