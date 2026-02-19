import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

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
            <a routerLink="/profile" (click)="isMenuOpen = false">Meu Perfil</a>
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
  `,
  styles: [`
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.5rem;
      height: 100%;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #1e293b;
      cursor: pointer;
    }

    .admin-link {
      color: #ef4444 !important;
      font-weight: 700 !important;
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

    .footer {
      text-align: center;
      padding: 3rem;
      color: #94a3b8;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }

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
        z-index: 1000;
        border-top: 1px solid #f1f5f9;
      }

      .nav-links.active {
        display: flex;
      }

      .nav-links a, .logout-btn {
        width: 100%;
        text-align: left;
        padding: 0.75rem 0;
      }
    }
  `]
})
export class AppComponent {
  isMenuOpen = false;
  constructor(public authService: AuthService, private router: Router) {}
  logout() { 
    this.authService.logout(); 
    this.router.navigate(['/landing']);
  }
}
