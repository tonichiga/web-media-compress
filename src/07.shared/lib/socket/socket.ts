/* eslint-disable no-unused-vars */
import io, { Socket } from "socket.io-client";

const isClient = typeof window !== "undefined";

class WebSocket {
  instance: Socket;
  registeredEvents: { [key: string]: (...args: unknown[]) => void };
  token: string;
  callback: (status: boolean) => void;

  init() {
    console.log("Socket init", window.Telegram?.WebApp?.initData);
    this.instance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnectionDelayMax: 4000,
      reconnectionDelay: 4000,
      retries: 0,
      auth: (cb) =>
        cb({
          hash: window.Telegram?.WebApp?.initData,
        }),
    });

    this.instance.on("connect", () => {
      console.log("%c Socket connect ", "color: green");
      this.callback?.(true);
    });

    this.instance.on("reconnect", () => {
      console.log("REASON reconnect");

      console.log("%c Socket reconnect ", "color: green");
    });

    this.instance.on("disconnect", (reason) => {
      console.log("REASON", reason);
      console.log("%c Socket disconnect ", "color: red");
    });

    this.instance.on("reconnect_error", (reason) => {
      console.log("Connect error REASON", reason);
    });

    this.instance.on("reconnect_error", (reason) => {
      console.log("Connect error REASON", reason);
    });

    this.on = (eventName, handler) => {
      this.instance.on(eventName, handler);
    };

    this.emit = (emitName: string, ...args) => {
      console.log("%c Socket emit ", "color: teal", emitName, ...args);
      this.instance.emit(emitName, ...args);
    };

    this.off = (eventName, listener) => {
      this.instance.off(eventName, listener);
    };

    this.instance.on("disconnected", async (reason) => {
      if (!isClient) return;
      console.log("Disconnected...", reason);

      if (reason === "invalidToken") {
        const hash = window.Telegram?.WebApp?.initData;
        if (!hash) {
          console.warn("Socket connect failed. No token found");
          return;
        }
        // console.log("Reconnecting HASH", hash);
        this.instance.auth = (cb) => cb({ hash });
        this.instance.disconnect().connect();
      }
    });
  }

  on(eventName, handler) {
    if (!this.isInitialized()) return;
    this.instance.on(eventName, handler);
  }

  emit(emitName: string, ...args) {
    if (!this.isInitialized()) return;
    console.log("%c Socket emit ", "color: teal", emitName, ...args);
    this.instance.emit(emitName, ...args);
  }

  off(eventName, listener) {
    if (!this.isInitialized()) return;
    this.instance.off(eventName, listener);
  }

  isInitialized() {
    return !!this.instance;
  }

  connect(callback?: (status: boolean) => void) {
    if (!isClient) return;
    const hash = window.Telegram?.WebApp?.initData;
    if (!this.instance.connected && hash) {
      console.log("Connecting to socket");
      this.callback = callback;
      this.instance.connect();
      if (callback) {
        this.callback = callback;
      }
    }
  }
}

const socket = new WebSocket();
if (isClient) {
  socket.init();
}

export default socket;
