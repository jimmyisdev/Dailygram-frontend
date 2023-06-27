class Socket {
  constructor() {
    this.socket = null;
  }
  connect(url) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
    }
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
  on(eventName, callback) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }
}
export { Socket };
// https://www.taniarascia.com/websockets-in-redux/
