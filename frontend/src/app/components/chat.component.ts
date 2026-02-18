import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  template: `
    <div style="max-width: 900px; margin: 0 auto; background: white; border-radius: 1.5rem; border: 1px solid #e2e8f0; height: 600px; display: flex; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);">
      <!-- Sidebar de Contatos (Simulada) -->
      <div style="width: 300px; border-right: 1px solid #e2e8f0; background: #f8fafc;">
        <div style="padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
          <h3 style="margin: 0; font-size: 1.25rem;">Mensagens</h3>
        </div>
        <div style="padding: 1rem;">
          <div style="background: white; padding: 1rem; border-radius: 1rem; border: 1px solid var(--primary-color); display: flex; align-items: center; gap: 1rem; cursor: pointer;">
            <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <i class="material-icons" style="color: #64748b;">person</i>
            </div>
            <div>
              <p style="margin: 0; font-weight: 700; font-size: 0.9rem;">Vendedor Exemplo</p>
              <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">Online</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Chat -->
      <div style="flex: 1; display: flex; flex-direction: column;">
        <div style="padding: 1.25rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1rem;">
          <div style="width: 35px; height: 35px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">VE</div>
          <h4 style="margin: 0;">Vendedor Exemplo</h4>
        </div>

        <div style="flex: 1; overflow-y: auto; padding: 1.5rem; background: #ffffff;">
          <div *ngFor="let msg of messages" 
               [style.display]="'flex'" 
               [style.justify-content]="msg.remetente.id === myId ? 'flex-end' : 'flex-start'"
               style="margin-bottom: 1rem;">
            <div [style.background]="msg.remetente.id === myId ? 'var(--primary-color)' : '#f1f5f9'"
                 [style.color]="msg.remetente.id === myId ? 'white' : 'var(--text-main)'"
                 style="padding: 0.75rem 1rem; border-radius: 1.25rem; max-width: 70%; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"
                 [style.border-bottom-right-radius]="msg.remetente.id === myId ? '0.25rem' : '1.25rem'"
                 [style.border-bottom-left-radius]="msg.remetente.id !== myId ? '0.25rem' : '1.25rem'">
              <p style="margin: 0; font-size: 0.95rem;">{{ msg.conteudo }}</p>
              <small style="font-size: 0.7rem; opacity: 0.7; display: block; margin-top: 0.25rem; text-align: right;">
                {{ msg.timestamp | date:'HH:mm' }}
              </small>
            </div>
          </div>
        </div>

        <div style="padding: 1.25rem; background: #f8fafc; border-top: 1px solid #e2e8f0;">
          <div style="display: flex; gap: 0.75rem; background: white; padding: 0.5rem; border-radius: 1rem; border: 1px solid #e2e8f0;">
            <input [(ngModel)]="newMessage" 
                   style="border: none; background: transparent; flex: 1; padding: 0.5rem 1rem; margin: 0;" 
                   placeholder="Escreva sua mensagem..." 
                   (keyup.enter)="send()">
            <button class="btn-primary" (click)="send()" style="padding: 0.5rem 1rem; border-radius: 0.75rem;">
              <i class="material-icons" style="font-size: 1.2rem;">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';
  myId = 1;
  recipientId = 2;

  constructor(private chatService: ChatService, private http: HttpClient) {}

  ngOnInit() {
    this.loadHistory();
    this.chatService.getMessages().subscribe(msg => {
      if (msg) this.messages.push(msg);
    });
  }

  loadHistory() {
    this.http.get<any[]>(`http://localhost:8080/api/chat/history/${this.myId}/${this.recipientId}`)
      .subscribe(data => this.messages = data);
  }

  send() {
    if (!this.newMessage.trim()) return;
    const msg = {
      remetente: { id: this.myId },
      destinatario: { id: this.recipientId },
      conteudo: this.newMessage
    };
    this.chatService.sendMessage(msg);
    this.messages.push({ ...msg, timestamp: new Date() });
    this.newMessage = '';
  }
}
