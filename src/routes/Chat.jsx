import React from 'react';
import io from 'socket.io-client';
import { SocketApi } from '../services/socketApi';

export class Chat extends React.Component {
  componentDidMount() {
    SocketApi.connect();
  }

  render() {
    const token = localStorage.getItem('auth');
    return (
      <div>
        {token}
      </div>
    );
  }
}

// export const Chat = () => {
//   const [done, setDone] = React.useState('');
//   const token = localStorage.getItem('auth');

//   React.useEffect(() => {
//     SocketApi.connect();

//     setDone('success');
//   }, [token]);
//   return (
//     <div>
//       <div>{done}</div>
//       <div>{token}</div>
//     </div>

//   );
// };
