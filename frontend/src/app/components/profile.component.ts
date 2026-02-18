import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
              <img [src]="user.fotoUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80'" 
                   style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f8fafc; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            </div>
            <div style="flex: 1;">
              <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #64748b; margin-bottom: 0.5rem;">URL DA FOTO</label>
              <input type="text" [(ngModel)]="user.fotoUrl" name="fotoUrl" placeholder="https://exemplo.com/foto.jpg" style="width: 100%;">
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(data => this.user = data);
  }

  save() {
    this.authService.updateProfile(this.user).subscribe(() => {
      alert('Perfil atualizado com sucesso!');
    });
  }
}
