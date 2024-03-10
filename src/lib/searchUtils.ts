// src/searchUtils.ts

import { Cashier } from "../data/data";
export const filterCashiers = (cashiers: Cashier[], query: string): Cashier[] => {
  return cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(query.toLowerCase()) ||
    cashier.foods.some(food => food.name.toLowerCase().includes(query.toLowerCase()))
  );
};
