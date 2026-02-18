import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  template: `
    <div style="max-width: 500px; margin: 4rem auto; background: white; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem;">Crie sua conta</h2>
        <p style="color: #64748b;">Junte-se a milhares de usuários no Espalhaí.</p>
      </div>
      
      <form (submit)="onSubmit()">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Nome</label>
            <input type="text" [(ngModel)]="user.nome" name="nome" placeholder="Nome" required>
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Telefone</label>
            <input type="tel" [(ngModel)]="user.telefone" name="telefone" placeholder="(00) 00000-0000" required>
          </div>
        </div>
        
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">E-mail</label>
          <input type="email" [(ngModel)]="user.email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Senha</label>
          <input type="password" [(ngModel)]="user.senha" name="senha" placeholder="Mínimo 6 caracteres" required>
        </div>
        
        <button type="submit" class="btn-primary" style="width: 100%; padding: 0.8rem; font-size: 1rem;">Criar minha conta</button>
      </form>
      
      <div style="margin-top: 2rem; text-align: center; border-top: 1px solid #f1f5f9; pt: 1.5rem;">
        <p style="color: #64748b; font-size: 0.9rem;">Já possui uma conta? 
          <a routerLink="/login" style="color: var(--primary-color); font-weight: 600; text-decoration: none;">Fazer login</a>
        </p>
      </div>
    </div>
  `
})
export class SignupComponent {
  user = { nome: '', email: '', senha: '', telefone: '' };
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.signup(this.user).subscribe(() => this.router.navigate(['/login']));
  }
}
