import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdService } from '../services/ad.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
  template: `
    <div style="max-width: 1000px; margin: 2rem auto; padding: 0 1rem;">
      <!-- Abas -->
      <div style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;">
        <button (click)="activeTab = 'perfil'" 
                [style.color]="activeTab === 'perfil' ? '#2563eb' : '#64748b'"
                [style.border-bottom]="activeTab === 'perfil' ? '2px solid #2563eb' : 'none'"
                style="background: none; border: none; padding: 0.5rem 1rem; font-weight: 700; cursor: pointer; font-size: 1rem;">
          Meu Perfil
        </button>
        <button (click)="activeTab = 'anuncios'" 
                [style.color]="activeTab === 'anuncios' ? '#2563eb' : '#64748b'"
                [style.border-bottom]="activeTab === 'anuncios' ? '2px solid #2563eb' : 'none'"
                style="background: none; border: none; padding: 0.5rem 1rem; font-weight: 700; cursor: pointer; font-size: 1rem;">
          Meus Anúncios
        </button>
      </div>

      <!-- Aba Perfil -->
      <div *ngIf="activeTab === 'perfil'" class="card" style="padding: 2.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 2rem; color: #1e293b;">Meu Perfil</h1>
        
        <form (submit)="save()" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <div style="grid-column: span 2; display: flex; align-items: center; gap: 2rem; margin-bottom: 1rem; padding-bottom: 2rem; border-bottom: 1px solid #f1f5f9;">
            <div style="position: relative;">
              <img [src]="user.fotoBase64 || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80'" 
                   style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f8fafc; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <button type="button" (click)="fileInput.click()" style="position: absolute; bottom: 0; right: 0; background: #2563eb; color: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                <span class="material-icons" style="font-size: 1.25rem;">camera_alt</span>
              </button>
              <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none" accept="image/*">
            </div>
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 0.875rem;">Clique no ícone da câmera para alterar sua foto de perfil. Formatos aceitos: JPG, PNG.</p>
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">NOME COMPLETO</label>
            <input type="text" [(ngModel)]="user.nome" name="nome" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1;">
          </div>

          <div>
            <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">TELEFONE (WhatsApp)</label>
            <input type="text" [(ngModel)]="user.telefone" name="telefone" placeholder="Ex: 85988887777" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1;">
          </div>

          <div style="grid-column: span 2; margin-top: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #334155; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-icons" style="font-size: 1.25rem; color: #2563eb;">location_on</span>
              Endereço
            </h3>
          </div>

          <div style="grid-column: span 2;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">CIDADE</label>
            <input type="text" [(ngModel)]="user.cidade" name="cidade" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1;">
          </div>

          <div style="grid-column: span 2;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">ESTADO</label>
            <input type="text" [(ngModel)]="user.estado" name="estado" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1;">
          </div>

          <div style="grid-column: span 2; margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
            <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem;">Salvar Alterações</button>
          </div>
        </form>
      </div>

      <!-- Aba Meus Anúncios -->
      <div *ngIf="activeTab === 'anuncios'">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h1 style="font-size: 2rem; font-weight: 800; color: #1e293b;">Meus Anúncios</h1>
          <a routerLink="/ad/create" class="btn-primary" style="text-decoration: none; padding: 0.75rem 1.5rem;">Criar Novo Anúncio</a>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
          <div *ngFor="let ad of myAds" style="background: white; border-radius: 1rem; border: 1px solid #e2e8f0; padding: 1.5rem; display: flex; gap: 1.5rem; align-items: center;">
            <img [src]="ad.imagens && ad.imagens.length > 0 ? ad.imagens[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'" style="width: 120px; height: 120px; border-radius: 0.75rem; object-fit: cover;">
            
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                <span [style.background]="ad.status === 'ATIVO' ? '#dcfce7' : '#f1f5f9'" 
                      [style.color]="ad.status === 'ATIVO' ? '#166534' : '#475569'"
                      style="padding: 0.25rem 0.75rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;">
                  {{ad.status}}
                </span>
                <span style="color: #94a3b8; font-size: 0.75rem;">Criado em {{ad.dataCriacao | date:'dd/MM/yyyy'}}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin-bottom: 0.25rem;">{{ad.titulo}}</h3>
              <div style="color: #2563eb; font-weight: 800; font-size: 1.1rem;">R$ {{ad.valor | number:'1.2-2'}}</div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button *ngIf="ad.status === 'ATIVO'" (click)="finishAd(ad)" title="Finalizar Anúncio" style="background: #f1f5f9; color: #475569; border: none; width: 40px; height: 40px; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-icons">check_circle</span>
              </button>
              <button (click)="editAd(ad)" title="Editar" style="background: #f1f5f9; color: #475569; border: none; width: 40px; height: 40px; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-icons">edit</span>
              </button>
              <button (click)="deleteAd(ad)" title="Excluir" style="background: #fee2e2; color: #ef4444; border: none; width: 40px; height: 40px; border-radius: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                <span class="material-icons">delete</span>
              </button>
            </div>
          </div>

          <div *ngIf="myAds.length === 0" style="text-align: center; padding: 4rem; background: #f8fafc; border-radius: 1rem; border: 2px dashed #e2e8f0; color: #64748b;">
            Você ainda não possui anúncios cadastrados.
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any = {};
  myAds: any[] = [];
  activeTab: 'perfil' | 'anuncios' = 'perfil';

  constructor(
    private authService: AuthService,
    private adService: AdService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadMyAds();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (data) => this.user = data,
      error: () => this.toastService.error('Erro ao carregar perfil.')
    });
  }

  loadMyAds() {
    this.adService.getMyAds().subscribe({
      next: (data) => this.myAds = data,
      error: () => this.toastService.error('Erro ao carregar seus anúncios.')
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.fotoBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    this.authService.updateProfile(this.user).subscribe({
      next: () => this.toastService.success('Perfil atualizado com sucesso!'),
      error: () => this.toastService.error('Erro ao atualizar perfil.')
    });
  }

  finishAd(ad: any) {
    if (confirm('Deseja realmente finalizar este anúncio? Ele não aparecerá mais nas buscas.')) {
      this.adService.updateStatus(ad.id, 'CONCLUIDO').subscribe({
        next: () => {
          this.toastService.success('Anúncio finalizado com sucesso!');
          this.loadMyAds();
        },
        error: () => this.toastService.error('Erro ao finalizar anúncio.')
      });
    }
  }

  deleteAd(ad: any) {
    if (confirm('Deseja realmente excluir este anúncio? Esta ação não pode ser desfeita.')) {
      this.adService.deleteAd(ad.id).subscribe({
        next: () => {
          this.toastService.success('Anúncio excluído com sucesso!');
          this.loadMyAds();
        },
        error: () => this.toastService.error('Erro ao excluir anúncio.')
      });
    }
  }

  editAd(ad: any) {
    // Para simplificar, poderíamos redirecionar para a página de criação passando o ID
    // Mas para manter o escopo, vamos apenas avisar que a edição está disponível
    this.toastService.info('Funcionalidade de edição em desenvolvimento.');
  }
}
