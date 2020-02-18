
import socketClient from 'socket.io-client';

export class SocketApi {
  static connect(token) {
    this.io = socketClient('http://localhost:3002/', { query: { token } });
  }
}
