import { Counter } from "../data/data";

export const filterCashiers = (cashiers: Counter[], query: string): Counter[] => {
  return cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(query.toLowerCase()) ||
    cashier.foods.some(food => food.name.toLowerCase().includes(query.toLowerCase()))
  );
};
