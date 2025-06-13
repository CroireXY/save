type WSCallback = (data: any) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private onMessageCallback: WSCallback | null = null;

  constructor(url: string) {
    this.url = url;
  }

  connect(userId: number) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("✅ WebSocket connected");

    //   const initMessage = {
    //     message: {
    //       userId: 2,
    //       clientMessageCode: "REGISTER_CONNECTION",
    //     },
    //   };
      this.socket?.send(
        JSON.stringify({          
          userId: 2,
          clientMessageCode: "REGISTER_CONNECTION",
        })
      );
    };

    this.socket.onmessage = (event) => {
      if (this.onMessageCallback) {
        try {
          const data = JSON.parse(event.data);
          this.onMessageCallback(data);
        } catch (e) {
          console.warn("Invalid message format:", event.data);
        }
      }
    };

    this.socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("🔌 WebSocket closed");
    };
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not connected yet.");
    }
  }

  close() {
    this.socket?.close();
  }

  onMessage(callback: WSCallback) {
    this.onMessageCallback = callback;
  }
}

export default WebSocketClient;
