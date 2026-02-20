import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" [routerLink]="authService.isLoggedIn() ? '/home' : '/landing'" style="cursor: pointer;">Espalhaí</div>
        
        <button class="mobile-menu-btn" (click)="isMenuOpen = !isMenuOpen">
          <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>

        <div class="nav-links" [class.active]="isMenuOpen">
          <a *ngIf="authService.isLoggedIn()" routerLink="/home" (click)="isMenuOpen = false">Explorar</a>
          
          <ng-container *ngIf="!authService.isLoggedIn()">
            <a routerLink="/landing" (click)="isMenuOpen = false">Sobre</a>
            <a routerLink="/login" (click)="isMenuOpen = false">Entrar</a>
            <a routerLink="/signup" class="btn-primary" (click)="isMenuOpen = false" style="color: white;">Começar Agora</a>
          </ng-container>

          <ng-container *ngIf="authService.isLoggedIn()">
            <a routerLink="/favorites" (click)="isMenuOpen = false">Favoritos</a>
            <a routerLink="/ad/create" (click)="isMenuOpen = false">Criar Anúncio</a>
            <a routerLink="/chat" (click)="isMenuOpen = false">Mensagens</a>
            <a routerLink="/profile" (click)="isMenuOpen = false" style="margin-right: 1rem;">Meu Perfil</a>
            <a *ngIf="authService.isAdmin()" routerLink="/admin" (click)="isMenuOpen = false" class="admin-link">Painel Admin</a>
            <button (click)="logout(); isMenuOpen = false" class="logout-btn">Sair</button>
          </ng-container>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <p>&copy; 2026 Espalhaí - Conectando você ao que importa.</p>
    </footer>

    <!-- Toast Container -->
    <div style="position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;">
      <div *ngFor="let toast of toastService.toasts$ | async" 
           [style.background]="toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6'"
           style="color: white; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 10px; animation: slideIn 0.3s ease-out;">
        <span class="material-icons" style="font-size: 1.25rem;">
          {{ toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info' }}
        </span>
        <span style="font-weight: 600;">{{ toast.message }}</span>
        <button (click)="toastService.remove(toast.id)" style="background: none; border: none; color: white; cursor: pointer; display: flex; align-items: center;">
          <span class="material-icons" style="font-size: 1.25rem;">close</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      height: 70px;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      height: 100%;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 800;
      color: #2563eb;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .nav-links a {
      color: #64748b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .nav-links a:hover {
      color: #1e293b;
    }
    .btn-primary {
      background: #2563eb;
      color: white !important;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      font-weight: 700;
    }
    .logout-btn {
      background: none;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: #f1f5f9;
      color: #1e293b;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      min-height: calc(100vh - 140px);
    }
    .footer {
      text-align: center;
      padding: 2rem;
      color: #94a3b8;
      font-size: 0.9rem;
      border-top: 1px solid #f1f5f9;
    }
    .mobile-menu-btn {
      display: none;
      background: none;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @media (max-width: 992px) {
      .mobile-menu-btn { display: block; }
      .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1.5rem;
        gap: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        border-bottom: 1px solid #e2e8f0;
      }
      .nav-links.active { display: flex; }
      .nav-links a, .logout-btn { width: 100%; text-align: left; }
    }
  `]
})
export class AppComponent {
  isMenuOpen = false;
  constructor(
    public authService: AuthService, 
    private router: Router,
    public toastService: ToastService
  ) {}

  logout() { 
    this.authService.logout(); 
    this.toastService.success('Logout realizado com sucesso.');
    this.router.navigate(['/landing']);
  }
}
