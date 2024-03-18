import React, { useState } from 'react';
import './App.css';
import { useCart } from './cart/CartProvider';
import { Button } from './components/ui/button';
import { Counter } from './data/data';
import FoodData from './data/data';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { filterCashiers } from './lib/searchUtils';
import { ScrollArea } from './components/ui/scroll-area';
import SearchBar from './components/SearchBar';
import DisplayCart from './components/DisplayCart';
import WebSocketTest from './test/testWebSockect';

const App: React.FC = () => {
  const [cashiers] = useState<Counter[]>(FoodData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToCart, cartItems } = useCart();
  const [showCartAnimation, setShowCartAnimation] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAnimation = (cashierId: string, foodId: string) => {
    addToCart(cashierId, foodId);
    setShowCartAnimation(true);
    setTimeout(() => {
      setShowCartAnimation(false);
    }, 100);
  };
  const calculateTotalQuantity = (): number => {
    let totalQuantity = 0;
    cartItems.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };


  const filteredCashiers = filterCashiers(cashiers, searchQuery);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Cashier Dashboard</h1>
        <div className="flex">
          <SearchBar value={searchQuery} onChange={handleSearch} />
          <DisplayCart showCartAnimation={showCartAnimation} calculateTotalQuantity={calculateTotalQuantity} cashiers={FoodData} />
        </div>
      </div>
      <WebSocketTest />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCashiers.map(cashier => (
          <div key={cashier.id} className="rounded-lg overflow-hidden shadow-md border">
            <Card>
              <CardHeader className="bg-gray-300 py-2 px-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold">{cashier.name}</CardTitle>
              </CardHeader>
              <CardContent className='my-3'>
                <ScrollArea className='h-[200px] rounded-md border p-2'>
                  <ul>
                    {cashier.foods.map(food => (
                      <li key={food.id} className="flex justify-between items-center border-b py-2">
                        <div>
                          <h3 className="text-lg font-semibold">{food.name}</h3>
                          <p className="text-gray-500">Stock: {food.stock}</p>
                          <p className="text-gray-500">Price: Rp. {food.price}</p>
                        </div>
                        <div className="flex flex-col">
                          <Button
                            onClick={() => handleAnimation(cashier.id, food.id)}
                          >
                            + Add
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

