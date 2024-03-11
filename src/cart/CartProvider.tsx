import React, { createContext, useContext, useState, FC } from 'react';

interface FoodItem {
  id: string;
  name: string;
  price: number;
}

interface Cashier {
  id: string;
  name: string;
  foods: FoodItem[];
}

interface CartItem {
  cashierId: string;
  foodId: string;
  quantity: number;
}

interface CartProviderProps {
  children: React.ReactNode;
}

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addToCart: (cashierId: string, foodId: string) => void;
  removeFromCart: (cashierId: string, foodId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addToCart = (cashierId: string, foodId: string) => {
    setCartItems(prevCartItems => {
      const existingCartItemIndex = prevCartItems.findIndex(item => item.cashierId === cashierId && item.foodId === foodId);
      const updatedCartItems = [...prevCartItems];
      if (existingCartItemIndex !== -1) {
        updatedCartItems[existingCartItemIndex].quantity += 1;
      } else {
        updatedCartItems.push({ cashierId, foodId, quantity: 1 });
      }
      return updatedCartItems;
    });
    updateTotalAmount();
  };

  const removeFromCart = (cashierId: string, foodId: string) => {
    setCartItems(prevCartItems => {
      const existingCartItemIndex = prevCartItems.findIndex(item => item.cashierId === cashierId && item.foodId === foodId);
      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        if (updatedCartItems[existingCartItemIndex].quantity > 1) {
          updatedCartItems[existingCartItemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(existingCartItemIndex, 1);
        }
        return updatedCartItems;
      }
      return prevCartItems;
    });
    updateTotalAmount();
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const updateTotalAmount = () => {
    let amount = 0;
    cartItems.forEach(item => {
      const cashier = FoodData.find(cashier => cashier.id === item.cashierId);
      if (cashier) {
        const food = cashier.foods.find(food => food.id === item.foodId);
        if (food) {
          amount += food.price * item.quantity;
        }
      }
    });
    setTotalAmount(amount);
  };

  const FoodData: Cashier[] = [
    {
      id: '1',
      name: 'Pak Roni',
      foods: [
        { id: '1', name: 'Pizza', price: 10000 },
        { id: '2', name: 'Cake', price: 10000 },
        { id: '3', name: 'Nasgor', price: 10000 },
      ],
    },
    // Add more cashiers and food items here if needed
  ];

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
