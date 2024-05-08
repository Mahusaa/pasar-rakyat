import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';



const TestDataComponent = () => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
      const socket = openSocket('http://localhost:8080');
  
      socket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });
  
      socket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <div>
        <h1>Socket.IO Connection Test</h1>
        <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
      </div>
    );
};

export default TestDataComponent;
