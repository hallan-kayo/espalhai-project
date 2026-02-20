import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
  template: `
    <div style="max-width: 800px; margin: 2rem auto; padding: 0 1rem;">
      <div class="card" style="padding: 2.5rem;">
        <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 2rem; color: #1e293b;">Meu Perfil</h1>
        
        <form (submit)="save()" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
          <!-- Foto e Dados Básicos -->
          <div style="grid-column: span 2; display: flex; align-items: center; gap: 2rem; margin-bottom: 1rem; padding-bottom: 2rem; border-bottom: 1px solid #f1f5f9;">
            <div style="position: relative;">
              <img [src]="user.fotoBase64 || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80'" 
                   style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f8fafc; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              <button type="button" (click)="fileInput.click()" style="position: absolute; bottom: 0; right: 0; background: var(--primary-color); color: white; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                <span class="material-icons" style="font-size: 1.25rem;">camera_alt</span>
              </button>
              <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none" accept="image/*">
            </div>
            <div style="flex: 1;">
              <p style="color: #64748b; font-size: 0.875rem;">Clique no ícone da câmera para alterar sua foto de perfil. Formatos aceitos: JPG, PNG.</p>
            </div>
          </div>

          <div>
            <label>NOME COMPLETO</label>
            <input type="text" [(ngModel)]="user.nome" name="nome" required>
          </div>

          <div>
            <label>TELEFONE</label>
            <input type="text" [(ngModel)]="user.telefone" name="telefone">
          </div>

          <!-- Endereço -->
          <div style="grid-column: span 2; margin-top: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 700; color: #334155; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-icons" style="font-size: 1.25rem; color: var(--primary-color);">location_on</span>
              Endereço
            </h3>
          </div>

          <div style="grid-column: span 2;">
            <label>RUA</label>
            <input type="text" [(ngModel)]="user.rua" name="rua">
          </div>

          <div>
            <label>NÚMERO</label>
            <input type="text" [(ngModel)]="user.numero" name="numero">
          </div>

          <div>
            <label>BAIRRO</label>
            <input type="text" [(ngModel)]="user.bairro" name="bairro">
          </div>

          <div>
            <label>CIDADE</label>
            <input type="text" [(ngModel)]="user.cidade" name="cidade">
          </div>

          <div>
            <label>ESTADO</label>
            <input type="text" [(ngModel)]="user.estado" name="estado">
          </div>

          <div style="grid-column: span 2;">
            <label>COMPLEMENTO</label>
            <input type="text" [(ngModel)]="user.complemento" name="complemento">
          </div>

          <div style="grid-column: span 2; margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
            <button type="button" class="btn-secondary" style="padding: 0.75rem 2rem;">Cancelar</button>
            <button type="submit" class="btn-primary" style="padding: 0.75rem 2rem;">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data) => this.user = data,
      error: () => this.toastService.error('Erro ao carregar perfil.')
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
}
