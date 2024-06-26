import React from 'react';
import SearchBar from './SearchBar';
import DisplayCart from './DisplayCart';
import { CounterItem } from '../interface/CounterItem';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showCartAnimation: boolean;
  calculateTotalQuantity: () => number;
  cashiers: CounterItem[];
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  showCartAnimation,
  calculateTotalQuantity,
  cashiers,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900">Cashier Dashboard</h1>
      <div className="flex items-center">
        <div className="mr-4">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
        <DisplayCart
          showCartAnimation={showCartAnimation}
          calculateTotalQuantity={calculateTotalQuantity}
          cashiers={cashiers}
        />
      </div>
    </div>
  );
};

export default Header;
