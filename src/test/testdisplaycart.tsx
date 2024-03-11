import React from 'react';
import { useCart } from '../cart/CartProvider';

interface FoodItemProps {
  cashierId: string;
  foodId: string;
  name: string;
  price: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ cashierId, foodId, name, price }) => {
  const { addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(cashierId, foodId);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cashierId, foodId);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>Price: ${price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    </div>
  );
};

export default FoodItem;
