import React, { useState, useEffect } from 'react';

const WebSocketTest: React.FC = () => {
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMenu(data);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);
  console.log(menu)

  return (
    <div>
      <h1>Menu from Firebase via WebSocket</h1>
      <ul>
        {menu.map((menuItem: any) => (
          <li key={menuItem.id}>
            <h2>{menuItem.name}</h2>
            <ul>
              {menuItem.foods.map((food: any) => (
                <li key={food.id}>
                  <p>Name: {food.name}</p>
                  <p>Price: {food.price}</p>
                  <p>Stock: {food.stock}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketTest;
