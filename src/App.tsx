import React, { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Cashier } from './data/data';
import FoodData from './data/data';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

const App: React.FC = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>(FoodData);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handlePurchase = (cashierId: string, foodId: string) => {
    const updatedCashiers = cashiers.map(cashier => {
      if (cashier.id === cashierId) {
        const updatedFoods = cashier.foods.map(food => {
          if (food.id === foodId && food.stock > 0) {
            return { ...food, stock: food.stock - 1 };
          }
          return food;
        });
        return { ...cashier, foods: updatedFoods };
      }
      return cashier;
    });
    setCashiers(updatedCashiers);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCashiers = cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.foods.some(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Cashier Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Cashier or Food"
          className="px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCashiers.map(cashier => (
          <div key={cashier.id}>
            <Card>
              <CardHeader>
                <CardTitle>{cashier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {cashier.foods.map(food => (
                    <li key={food.id} className="flex justify-between items-center border-b py-1">
                      <div>
                        <h3 className="text-base font-semibold">{food.name}</h3>
                        <p className="text-gray-500">Stock: {food.stock}</p>
                      </div>
                      <Button
                        onClick={() => handlePurchase(cashier.id, food.id)}
                        className={` ${food.stock === 0 && 'opacity-50 cursor-not-allowed'}`}
                        disabled={food.stock === 0}
                      >
                        Purchase
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

