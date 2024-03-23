import { CounterItem } from "../interface/CounterItem";

export const filterCashiers = (cashiers: CounterItem[], query: string): CounterItem[] => {
  return cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(query.toLowerCase()) ||
    cashier.foods.some(food => food.name.toLowerCase().includes(query.toLowerCase()))
  );
};
