import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div style="max-width: 450px; margin: 4rem auto; background: white; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem;">Bem-vindo de volta</h2>
        <p style="color: #64748b;">Entre na sua conta para gerenciar seus anúncios.</p>
      </div>
      
      <form (submit)="onSubmit()">
        <div style="margin-bottom: 1.25rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">E-mail</label>
          <input type="email" [(ngModel)]="credentials.email" name="email" placeholder="seu@email.com" required>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Senha</label>
          <input type="password" [(ngModel)]="credentials.senha" name="senha" placeholder="••••••••" required>
        </div>
        
        <button type="submit" class="btn-primary" style="width: 100%; padding: 0.8rem; font-size: 1rem;">Entrar na conta</button>
      </form>
      
      <div style="margin-top: 2rem; text-align: center; border-top: 1px solid #f1f5f9; pt: 1.5rem;">
        <p style="color: #64748b; font-size: 0.9rem;">Ainda não tem uma conta? 
          <a routerLink="/signup" style="color: var(--primary-color); font-weight: 600; text-decoration: none;">Cadastre-se grátis</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = { email: '', senha: '' };
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.login(this.credentials).subscribe(() => this.router.navigate(['/home']));
  }
}
