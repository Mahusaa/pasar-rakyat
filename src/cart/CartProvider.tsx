import React, { createContext, useContext, useState, FC } from 'react';
import FoodData from '../data/data';
import { CartItem } from '../interface/CartItem';

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addToCart: (counterId: string, foodId: string) => void;
  removeFromCart: (counterId: string, foodId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
});

export const useCart = () => useContext(CartContext);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addToCart = (counterId: string, foodId: string) => {
    setCartItems(prevCartItems => {
      const existingCartItemIndex = prevCartItems.findIndex(item => item.counterId === counterId && item.foodId === foodId);
      const updatedCartItems = [...prevCartItems];
      if (existingCartItemIndex !== -1) {
        updatedCartItems[existingCartItemIndex].quantity += 1;
      } else {
        updatedCartItems.push({ counterId, foodId, quantity: 1 });
      }
      const amount = updatedCartItems.reduce((total, item) => {
        const counter = FoodData.find(counter => counter.id === item.counterId);
        if (counter) {
          const food = counter.foods.find(food => food.id === item.foodId);
          if (food) {
            total += food.price * item.quantity;
          }
        }
        return total;
      }, 0);
      setTotalAmount(amount);
      return updatedCartItems;
    });
  };

  const removeFromCart = (counterId: string, foodId: string) => {
    setCartItems(prevCartItems => {
      const existingCartItemIndex = prevCartItems.findIndex(item => item.counterId === counterId && item.foodId === foodId);
      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        if (updatedCartItems[existingCartItemIndex].quantity > 1) {
          updatedCartItems[existingCartItemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(existingCartItemIndex, 1);
        };
        const amount = updatedCartItems.reduce((total, item) => {
          const counter = FoodData.find(counter => counter.id === item.counterId);
          if (counter) {
            const food = counter.foods.find(food => food.id === item.foodId);
            if (food) {
              total += food.price * item.quantity;
            }
          }
          return total;
        }, 0);
        setTotalAmount(amount);
        return updatedCartItems;
      }
      return prevCartItems;
    });
  };


  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };


  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
