import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar">
      <div class="logo">Espalhaí</div>
      <div class="nav-links">
        <a routerLink="/home">Explorar</a>
        <ng-container *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login">Entrar</a>
          <a routerLink="/signup" class="btn-primary" style="color: white; padding: 0.5rem 1rem; margin-left: 1rem;">Começar Agora</a>
        </ng-container>
        <ng-container *ngIf="authService.isLoggedIn()">
          <a routerLink="/ad/create">Criar Anúncio</a>
          <a routerLink="/chat">Mensagens</a>
          <a routerLink="/profile">Meu Perfil</a>
          <a routerLink="/admin">Admin</a>
          <button (click)="logout()" style="background: none; border: 1px solid #e2e8f0; color: #64748b; padding: 0.4rem 0.8rem; border-radius: 0.5rem; margin-left: 1rem; cursor: pointer;">Sair</button>
        </ng-container>
      </div>
    </nav>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <footer style="text-align: center; padding: 3rem; color: #94a3b8; font-size: 0.9rem;">
      &copy; 2026 Espalhaí - Conectando você ao que importa.
    </footer>
  `
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  logout() { this.authService.logout(); }
}
