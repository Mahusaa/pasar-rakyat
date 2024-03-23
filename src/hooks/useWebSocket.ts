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
  const [error, setError] = useState<string | null>(null); // New state for storing errors

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
      setError(null); // Clear any previous error
    };

    ws.onmessage = (event) => {
      const newData: MenuItem[] = JSON.parse(event.data);
      setData(newData);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('An error occurred. Please try again later.'); 
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
      setError('WebSocket connection closed unexpectedly.');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, connected, error }; 
};

export default useWebSocket;
