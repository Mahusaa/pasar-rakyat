interface Food {
    id: string;
    name: string;
    price: number;
    stock: number;
  }
  
export  interface CounterItem {
    id: string;
    name: string;
    foods: Food[];
  }
  