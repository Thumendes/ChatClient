import { io, Socket } from "socket.io-client";
import { ChatEvents } from "../data/chat";

class Ws {
  public socket!: Socket;
  public events = new Map<ChatEvents, (...params: any[]) => void>();

  constructor() {
    this.init();
  }

  private init() {
    const url = process.env.REACT_APP_API_URL;

    if (!url) return console.error("Não foi configurado REACT_APP_API_URL");

    this.socket = io(url);
  }

  public on(event: ChatEvents, callback: (...params: any[]) => void) {
    if (this.events.has(event)) {
      throw new Error(
        "Já existe handler para esse evento! Caso esteja usando dentro de useEffect, lembre-se de remover o listener no retorno do useEffect"
      );
    }

    this.events.set(event, callback);
    this.socket.on(event, callback);
  }

  public clear(event: ChatEvents) {
    this.events.delete(event);
  }

  public send(event: ChatEvents, ...params: any[]) {
    this.socket.emit(event, ...params);
  }
}

const ws = new Ws();

export default ws;
