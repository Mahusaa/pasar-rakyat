import { useState, useEffect } from 'react';

interface Food {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface MenuItem {
  id: string;
  name: string;
  foods: Food[];
}

const useWebSocket = (url: string) => {
  const [data, setData] = useState<MenuItem[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      const newData: MenuItem[] = JSON.parse(event.data);
      setData(newData);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, connected };
};

export default useWebSocket;
