const vendors = [
  {
    id: 'my-restaurant',
    name: 'Kafe Mahallah Bilal',
    location: 'Mahallah Bilal, Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'my-1',
        name: 'Nasi Ayam Gepuk',
        description: 'Smashed fried chicken with sambal and rice',
        price: 8.0,
        category: 'Rice',
        available: true,
      },
      {
        id: 'Roti Canai',
        name: 'Roti Canai',
        description: 'Flaky flatbread with curry',
        price: 1.20,
        category: 'Roti/Bread',
        available: true,
      },
      {
        id: 'Teh Tarik',
        name: 'Teh Tarik',
        description: 'Sweetened tea with milk',
        price: 2.0,
        category: 'Drinks',
        available: false,
      },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      {
        id: 'ami-1',
        name: 'Nasi Ayam Penyet',
        description: 'Smashed fried chicken with sambal and rice',
        price: 9,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ami-2',
        name: 'Air Bandung',
        description: 'Rose syrup with milk',
        price: 3,
        category: 'Drinks',
        available: true,
      },
    ],
  },
]

export default vendors