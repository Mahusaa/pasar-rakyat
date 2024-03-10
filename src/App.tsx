import React, { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { Cashier, FoodItem } from './data/data';
import FoodData from './data/data';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { filterCashiers } from './lib/searchUtils';

const App: React.FC = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>(FoodData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [purchaseQuantities, setPurchaseQuantities] = useState<{ [cashierId: string]: { [foodId: string]: number } }>({});

  const handleQuantityChange = (cashierId: string, foodId: string, quantity: number) => {
    setPurchaseQuantities(prevState => ({
      ...prevState,
      [cashierId]: {
        ...prevState[cashierId],
        [foodId]: quantity
      }
    }));
  };

  const handlePurchase = (cashierId: string, purchaseQuantities: { [foodId: string]: number }) => {
    const updatedCashiers = cashiers.map(cashier => {
      if (cashier.id === cashierId) {
        const updatedFoods = cashier.foods.map(food => {
          const quantityPurchased = purchaseQuantities[food.id] || 0;
          if (quantityPurchased > 0 && food.stock >= quantityPurchased) {
            return { ...food, stock: food.stock - quantityPurchased };
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

  const filteredCashiers = filterCashiers(cashiers, searchQuery);

  const calculateTotalPrice = (cashierId: string): number => {
    const cashier = cashiers.find(cashier => cashier.id === cashierId);
    if (!cashier) return 0;

    let totalPrice = 0;
    const purchaseItems = purchaseQuantities[cashierId];
    if (!purchaseItems) return 0;

    cashier.foods.forEach(food => {
      const quantity = purchaseItems[food.id] || 0;
      totalPrice += quantity * food.price;
    });

    return totalPrice;
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Cashier Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCashiers.map(cashier => (
          <div key={cashier.id} className="rounded-lg overflow-hidden shadow-md border">
            <Card>
              <CardHeader className="bg-gray-300 py-2 px-4 rounded-t-lg">
                <CardTitle className="text-xl font-bold">{cashier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {cashier.foods.map(food => (
                    <li key={food.id} className="flex justify-between items-center border-b py-2">
                      <div>
                        <h3 className="text-lg font-semibold">{food.name}</h3>
                        <p className="text-gray-500">Stock: {food.stock}</p>
                        <p className="text-gray-500">Price: Rp. {food.price}</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="number"
                          placeholder='0'
                          value={(purchaseQuantities[cashier.id] && purchaseQuantities[cashier.id][food.id])}
                          onChange={(e) => handleQuantityChange(cashier.id, food.id, parseInt(e.target.value))}
                          className="py-1 px-2 text-center border border-gray-300 rounded-md w-16"
                          min={0}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                <p className="text-lg font-semibold">Total Price: Rp. {calculateTotalPrice(cashier.id)}</p>
                <Button onClick={() => handlePurchase(cashier.id, purchaseQuantities[cashier.id] || {})} className="px-4 py-2  text-white rounded-md"> Beli </Button>
                </div>
            </Card>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

