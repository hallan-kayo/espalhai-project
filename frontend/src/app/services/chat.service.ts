import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      onConnect: () => {
        console.log('Connected to WS');
        this.subscribeToPrivateMessages();
      }
    });
    this.stompClient.activate();
  }

  private subscribeToPrivateMessages() {
    // Assume-se que o ID do usuário logado está disponível
    const userId = 1; // Exemplo
    this.stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
      this.messageSubject.next(JSON.parse(message.body));
    });
  }

  sendMessage(msg: any) {
    this.stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(msg)
    });
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
