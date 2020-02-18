
import socketClient from 'socket.io-client';

export class SocketApi {
  static connect() {
    this.io = socketClient('http://localhost:3002/');
  }
}
