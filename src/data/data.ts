export interface FoodItem {
    id: string;
    name: string;
    stock: number;
  }
  
export interface Cashier {
    id: string;
    name: string;
    foods: FoodItem[];
  }


const FoodData: Cashier[] = [
    {
        id: '1',
        name: 'Pak Roni',
        foods: [
          { id: '1', name: 'Pizza', stock: 10 },
          { id: '2', name: 'Cake', stock: 5 },
          { id: '3', name: 'Nasgor', stock: 6 },
        ],
      },
      {
        id: '2',
        name: 'Pak Dido',
        foods: [
          { id: '4', name: 'Nasi Goreng', stock: 5 },
          { id: '5', name: 'Mie Ayam', stock: 4 },
        ],
      },
      // Add more cashiers as needed
      {
        id: '3',
        name: 'Mbak Siti',
        foods: [
          { id: '6', name: 'Sate', stock: 8 },
          { id: '7', name: 'Gado-gado', stock: 7 },
        ],
      },
      {
        id: '4',
        name: 'Pak Joko',
        foods: [
          { id: '8', name: 'Soto', stock: 9 },
          { id: '9', name: 'Bakso', stock: 10 },
        ],
      },
      {
        id: '5',
        name: 'Pak Roni',
        foods: [
          { id: '1', name: 'Pizza', stock: 10 },
          { id: '2', name: 'Cake', stock: 5 },
          { id: '3', name: 'Nasgor', stock: 6 },
        ],
      },
      {
        id: '6',
        name: 'Pak Dido',
        foods: [
          { id: '4', name: 'Nasi Goreng', stock: 5 },
          { id: '5', name: 'Mie Ayam', stock: 4 },
        ],
      },
      // Add more cashiers as needed
      {
        id: '7',
        name: 'Mbak Siti',
        foods: [
          { id: '6', name: 'Sate', stock: 8 },
          { id: '7', name: 'Gado-gado', stock: 7 },
        ],
      },
      {
        id: '8',
        name: 'Pak Joko',
        foods: [
          { id: '8', name: 'Soto', stock: 9 },
          { id: '9', name: 'Bakso', stock: 10 },
        ],
      },
];

export default FoodData;