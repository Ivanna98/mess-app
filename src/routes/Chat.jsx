import React from 'react';
import { SocketApi } from '../services/socketApi';

export const Chat = ({ history }) => {
  const [done, setDone] = React.useState('');
  const token = localStorage.getItem('auth');

  React.useEffect(() => {
    if (token) {
      SocketApi.connect(token);
      setDone('success');
    } else {
      history.push('/login');
    }
  }, [token]);

  return (
    <div>
      <div>{done}</div>
      <div>{token}</div>
    </div>

  );
};
