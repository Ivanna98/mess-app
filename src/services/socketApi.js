
import socketClient from 'socket.io-client';

export class SocketApi {
  static connect(token, callback) {
    this.io = socketClient.connect('http://localhost:3002/', { query: { token } });
    this.io.on('connect', callback);
  }
}
