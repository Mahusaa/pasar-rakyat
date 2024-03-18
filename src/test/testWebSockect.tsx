import React, { useState, useEffect } from 'react';

const WebSocketTest: React.FC = () => {
  const [messages, setMessages] = useState<string[] | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:5000');

    newSocket.onmessage = function(event) {
      const newMessage: string = event.data;
      setMessages(prevMessages => (prevMessages ? [...prevMessages, newMessage] : [newMessage]));
    };

    newSocket.onopen = function() {
      console.log('WebSocket connection established.');
    };

    newSocket.onclose = function() {
      console.log('WebSocket connection closed.');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(messageInput);
      setMessageInput('');
      console.log('Message sent to server:', messageInput);
    } else {
      console.log('WebSocket connection is not open.');
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Test</h1>
      <div>
        <textarea rows={10} cols={50} value={messages ? messages.join('\n') : ''} readOnly></textarea>
      </div>
      <div>
        <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Enter message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default WebSocketTest;

