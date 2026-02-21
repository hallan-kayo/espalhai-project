import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-chat',
  template: `
    <div style="max-width: 1000px; margin: 1rem auto; background: white; border-radius: 1.5rem; border: 1px solid #e2e8f0; height: 750px; display: flex; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);">
      <!-- Sidebar de Contatos -->
      <div style="width: 320px; border-right: 1px solid #e2e8f0; background: #f8fafc; display: flex; flex-direction: column;">
        <div style="padding: 1.5rem; border-bottom: 1px solid #e2e8f0; background: white;">
          <h3 style="margin: 0; font-size: 1.5rem; font-weight: 800; color: #1e293b;">Conversas</h3>
        </div>
        <div style="flex: 1; overflow-y: auto; padding: 1rem;">
          <div style="background: white; padding: 1rem; border-radius: 1rem; border: 2px solid #2563eb; display: flex; align-items: center; gap: 1rem; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="width: 48px; height: 48px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
              <span class="material-icons" style="color: #64748b; font-size: 2rem;">person</span>
            </div>
            <div style="flex: 1;">
              <p style="margin: 0; font-weight: 700; font-size: 1rem; color: #1e293b;">Anunciante</p>
              <p style="margin: 0; font-size: 0.8rem; color: #10b981; font-weight: 600;">Online</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Área de Chat -->
      <div style="flex: 1; display: flex; flex-direction: column; background: #f1f5f9;">
        <!-- Header do Chat -->
        <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; background: white; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 40px; height: 40px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">
              <span class="material-icons">person</span>
            </div>
            <div>
              <h4 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #1e293b;">Conversa ativa</h4>
              <p style="margin: 0; font-size: 0.75rem; color: #64748b;">Respondendo agora</p>
            </div>
          </div>
        </div>

        <!-- Mensagens -->
        <div #scrollContainer style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
          <div *ngFor="let msg of messages" 
               [style.align-self]="msg.remetente.id === myId ? 'flex-end' : 'flex-start'"
               [style.max-width]="'75%'">
            
            <div [style.background]="msg.remetente.id === myId ? '#2563eb' : 'white'"
                 [style.color]="msg.remetente.id === myId ? 'white' : '#1e293b'"
                 style="padding: 0.75rem 1rem; border-radius: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
                 [style.border-bottom-right-radius]="msg.remetente.id === myId ? '0.25rem' : '1.25rem'"
                 [style.border-bottom-left-radius]="msg.remetente.id !== myId ? '0.25rem' : '1.25rem'">
              
              <!-- Conteúdo de Texto -->
              <p *ngIf="msg.conteudo" style="margin: 0; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap;">{{ msg.conteudo }}</p>
              
              <!-- Anexo: Imagem -->
              <div *ngIf="msg.anexoBase64 && msg.anexoTipo?.startsWith('image/')" style="margin-top: 0.5rem;">
                <img [src]="msg.anexoBase64" style="max-width: 100%; border-radius: 0.75rem; cursor: pointer;" (click)="openFile(msg.anexoBase64)">
              </div>

              <!-- Anexo: PDF -->
              <div *ngIf="msg.anexoBase64 && msg.anexoTipo === 'application/pdf'" 
                   (click)="openFile(msg.anexoBase64)"
                   style="margin-top: 0.5rem; background: rgba(0,0,0,0.05); padding: 0.75rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; border: 1px solid rgba(0,0,0,0.1);">
                <span class="material-icons" [style.color]="msg.remetente.id === myId ? 'white' : '#ef4444'">picture_as_pdf</span>
                <div style="flex: 1; overflow: hidden;">
                  <div style="font-size: 0.85rem; font-weight: 700; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{msg.anexoNome || 'Documento.pdf'}}</div>
                  <div style="font-size: 0.7rem; opacity: 0.8;">Clique para abrir</div>
                </div>
              </div>

              <small style="font-size: 0.7rem; opacity: 0.7; display: block; margin-top: 0.4rem; text-align: right;">
                {{ msg.timestamp | date:'HH:mm' }}
              </small>
            </div>
          </div>
        </div>

        <!-- Preview de Anexo -->
        <div *ngIf="selectedFile" style="padding: 1rem; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 1rem;">
          <div style="position: relative; width: 60px; height: 60px; background: white; border-radius: 0.5rem; border: 1px solid #cbd5e1; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img *ngIf="selectedFile.tipo.startsWith('image/')" [src]="selectedFile.base64" style="width: 100%; height: 100%; object-fit: cover;">
            <span *ngIf="selectedFile.tipo === 'application/pdf'" class="material-icons" style="color: #ef4444; font-size: 2rem;">picture_as_pdf</span>
            <button (click)="removeSelectedFile()" style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              <span class="material-icons" style="font-size: 14px;">close</span>
            </button>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #1e293b;">{{selectedFile.nome}}</div>
            <div style="font-size: 0.75rem; color: #64748b;">Pronto para enviar</div>
          </div>
        </div>

        <!-- Input de Mensagem -->
        <div style="padding: 1.25rem; background: white; border-top: 1px solid #e2e8f0;">
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button (click)="fileInput.click()" style="background: #f1f5f9; color: #64748b; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
              <span class="material-icons">attach_file</span>
            </button>
            <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none" accept="image/*,application/pdf">
            
            <div style="flex: 1; display: flex; gap: 0.75rem; background: #f8fafc; padding: 0.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0;">
              <input [(ngModel)]="newMessage" 
                     style="border: none; background: transparent; flex: 1; padding: 0.5rem 1rem; margin: 0; outline: none; font-size: 0.95rem;" 
                     placeholder="Escreva sua mensagem..." 
                     (keyup.enter)="send()">
              <button (click)="send()" 
                      [disabled]="!newMessage.trim() && !selectedFile"
                      [style.background]="newMessage.trim() || selectedFile ? '#2563eb' : '#cbd5e1'"
                      style="color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                <span class="material-icons">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  messages: any[] = [];
  newMessage = '';
  myId: number = 0;
  recipientId: number = 0;
  selectedFile: any = null;

  constructor(
    private chatService: ChatService, 
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(user => {
      this.myId = user.id;
      this.route.queryParams.subscribe(params => {
        this.recipientId = params['user'] ? +params['user'] : 0;
        if (this.recipientId) {
          this.loadHistory();
        }
      });
    });

    this.chatService.getMessages().subscribe(msg => {
      if (msg && (msg.remetente.id === this.recipientId || msg.remetente.id === this.myId)) {
        this.messages.push(msg);
        this.scrollToBottom();
      }
    });
  }

  loadHistory() {
    this.http.get<any[]>(`http://localhost:8080/api/chat/history/${this.myId}/${this.recipientId}`)
      .subscribe(data => {
        this.messages = data;
        this.scrollToBottom();
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastService.error('Arquivo muito grande (máx 5MB)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFile = {
          nome: file.name,
          tipo: file.type,
          base64: e.target.result
        };
      };
      reader.readAsDataURL(file);
    }
  }

  removeSelectedFile() {
    this.selectedFile = null;
  }

  send() {
    if (!this.newMessage.trim() && !this.selectedFile) return;

    const msg: any = {
      remetente: { id: this.myId },
      destinatario: { id: this.recipientId },
      conteudo: this.newMessage,
      timestamp: new Date()
    };

    if (this.selectedFile) {
      msg.anexoBase64 = this.selectedFile.base64;
      msg.anexoNome = this.selectedFile.nome;
      msg.anexoTipo = this.selectedFile.tipo;
    }

    this.chatService.sendMessage(msg);
    // Para visualização imediata (o WebSocket enviará de volta, mas aqui garantimos fluidez)
    // this.messages.push(msg); // Opcional se o WebSocket for rápido o suficiente
    
    this.newMessage = '';
    this.selectedFile = null;
    this.scrollToBottom();
  }

  openFile(base64: string) {
    const win = window.open();
    if (win) {
      win.document.write('<iframe src="' + base64 + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }, 100);
  }
}
