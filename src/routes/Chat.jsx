import React from 'react';
import sc from 'socket.io-client';

export const Chat = () => {
  const [done, setDone] = React.useState('Nothing');
  const token = localStorage.getItem('auth');
  const onConnect = React.useCallback(() => {
    const socket = sc.connect('http://localhost:3002');
    socket.on('connection', (sock) => {
      sock
        .on('authenticated', () => setDone('cool'))
        .emit('auth', { token });
    });
  }, []);
  React.useEffect(() => onConnect());
  return (
    <div>{done}</div>
  );
};
