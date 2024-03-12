export interface FoodItem {
    id: string;
    name: string;
    stock: number;
    price: number;
  }
  
export interface Counter {
    id: string;
    name: string;
    foods: FoodItem[];
  }


const FoodData: Counter[] = [
  {
    id: '1',
    name: 'Pak Roni',
    foods: [
      { id: '1', name: 'Pizza', stock: 10, price: 10000 },
      { id: '2', name: 'Cake', stock: 5, price: 10000},
      { id: '3', name: 'Nasgor', stock: 6, price: 10000},
    ],
  },
  {
    id: '2',
    name: 'Pak Dido',
    foods: [
      { id: '1', name: 'Nasi Goreng', stock: 5, price: 9000 },
      { id: '2', name: 'Mie Ayam', stock: 4, price: 8000},
    ],
  },
  {
    id: '3',
    name: 'Pak Joko',
    foods: [
      { id: '1', name: 'Sate Ayam', stock: 8, price: 12000 },
      { id: '2', name: 'Bakso', stock: 7, price: 10000},
    ],
  },
  {
    id: '4',
    name: 'Ibu Siti',
    foods: [
      { id: '1', name: 'Gado-gado', stock: 6, price: 11000 },
      { id: '2', name: 'Soto Ayam', stock: 5, price: 9000},
    ],
  },
  {
    id: '5',
    name: 'Pak Ahmad',
    foods: [
      { id: '1', name: 'Ayam Goreng', stock: 9, price: 15000 },
      { id: '2', name: 'Rendang', stock: 8, price: 13000},
    ],
  },
  {
    id: '6',
    name: 'Ibu Ani',
    foods: [
      { id: '1', name: 'Soto Betawi', stock: 7, price: 12000 },
      { id: '2', name: 'Ketoprak', stock: 6, price: 11000},
    ],
  },
  {
    id: '7',
    name: 'Pak Budi',
    foods: [
      { id: '1', name: 'Nasi Padang', stock: 10, price: 13000 },
      { id: '2', name: 'Pecel Lele', stock: 8, price: 10000},
    ],
  },
  {
    id: '8',
    name: 'Ibu Yanti',
    foods: [
      { id: '1', name: 'Nasi Uduk', stock: 8, price: 11000 },
      { id: '2', name: 'Lontong Sayur', stock: 7, price: 9000},
    ],
  },
  {
    id: '9',
    name: 'Pak Eko',
    foods: [
      { id: '1', name: 'Bakmi Goreng', stock: 6, price: 12000 },
      { id: '2', name: 'Capcay', stock: 5, price: 10000},
    ],
  },
  {
    id: '10',
    name: 'Ibu Rina',
    foods: [
      { id: '1', name: 'Sop Buntut', stock: 9, price: 14000 },
      { id: '2', name: 'Tahu Goreng', stock: 8, price: 10000},
    ],
  },
];

export default FoodData;