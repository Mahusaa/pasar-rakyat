import React from 'react';
import { useCart } from '../cart/CartProvider';

const Cart: React.FC = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            Cashier ID: {item.cashierId}, Food ID: {item.foodId}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Amount: ${totalAmount}</p>
    </div>
  );
};

export default Cart;
