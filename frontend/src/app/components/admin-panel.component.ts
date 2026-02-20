import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-admin-panel',
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Gerencie usuários, categorias, anúncios e denúncias do Espalhaí.</p>
      </div>

      <div class="admin-tabs">
        <button [class.active]="activeTab === 'users'" (click)="activeTab = 'users'">Usuários</button>
        <button [class.active]="activeTab === 'ads'" (click)="activeTab = 'ads'">Anúncios</button>
        <button [class.active]="activeTab === 'categories'" (click)="activeTab = 'categories'">Categorias</button>
        <button [class.active]="activeTab === 'reports'" (click)="activeTab = 'reports'">Denúncias</button>
      </div>

      <div class="admin-content card">
        <!-- Usuários -->
        <div *ngIf="activeTab === 'users'" class="table-responsive">
          <!-- Formulário Criar Admin -->
          <div style="background: #f8fafc; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-icons" style="font-size: 1.25rem; color: #2563eb;">admin_panel_settings</span>
              Novo Administrador
            </h3>
            <div style="display: flex; gap: 0.75rem; align-items: flex-end;">
              <div style="flex: 1;">
                <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.4rem; color: #64748b;">NOME</label>
                <input type="text" [(ngModel)]="newAdmin.nome" placeholder="Nome" style="width: 100%; padding: 0.6rem; border-radius: 0.4rem; border: 1px solid #cbd5e1;">
              </div>
              <div style="flex: 1;">
                <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.4rem; color: #64748b;">EMAIL</label>
                <input type="email" [(ngModel)]="newAdmin.email" placeholder="Email" style="width: 100%; padding: 0.6rem; border-radius: 0.4rem; border: 1px solid #cbd5e1;">
              </div>
              <div style="flex: 1;">
                <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.4rem; color: #64748b;">SENHA</label>
                <input type="password" [(ngModel)]="newAdmin.senha" placeholder="Senha" style="width: 100%; padding: 0.6rem; border-radius: 0.4rem; border: 1px solid #cbd5e1;">
              </div>
              <button class="btn-primary" (click)="addAdmin()" style="padding: 0.6rem 1.2rem;">Criar Admin</button>
            </div>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of users">
                <td>
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; background: #e2e8f0; display: flex; align-items: center; justify-content: center;">
                      <img *ngIf="user.fotoBase64" [src]="user.fotoBase64" style="width: 100%; height: 100%; object-fit: cover;">
                      <span *ngIf="!user.fotoBase64" class="material-icons" style="font-size: 1.25rem; color: #94a3b8;">person</span>
                    </div>
                    {{user.nome}}
                  </div>
                </td>
                <td>{{user.email}}</td>
                <td>
                  <span [style.background]="user.role === 'ROLE_ADMIN' ? '#e0f2fe' : '#f1f5f9'" 
                        [style.color]="user.role === 'ROLE_ADMIN' ? '#0369a1' : '#475569'"
                        style="padding: 0.2rem 0.6rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 700;">
                    {{user.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}}
                  </span>
                </td>
                <td>
                  <span [class]="user.ativo ? 'badge-success' : 'badge-danger'">
                    {{user.ativo ? 'Ativo' : 'Inativo'}}
                  </span>
                </td>
                <td>
                  <button (click)="toggleUser(user.id)" class="btn-sm" [class.btn-danger]="user.ativo" [class.btn-success]="!user.ativo">
                    {{user.ativo ? 'Desativar' : 'Ativar'}}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Categorias -->
        <div *ngIf="activeTab === 'categories'">
          <div class="action-bar">
            <input type="text" [(ngModel)]="newCat.nome" placeholder="Nova categoria..." style="flex: 1; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #cbd5e1;">
            <button class="btn-primary" (click)="addCategory()">Adicionar</button>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let cat of categories">
                <td>{{cat.nome}}</td>
                <td>
                  <button (click)="deleteCategory(cat.id)" class="btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Placeholder para outras abas -->
        <div *ngIf="activeTab === 'ads' || activeTab === 'reports'" class="empty-state">
          <span class="material-icons">construction</span>
          <p>Módulo em desenvolvimento ou sem dados para exibir.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .admin-header {
      margin-bottom: 2rem;
    }
    .admin-header h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }
    .admin-header p {
      color: #64748b;
    }
    .admin-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }
    .admin-tabs button {
      padding: 0.75rem 1.5rem;
      border: none;
      background: #f1f5f9;
      color: #64748b;
      border-radius: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .admin-tabs button.active {
      background: #2563eb;
      color: white;
    }
    .admin-content {
      padding: 1.5rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    .admin-table th {
      padding: 1rem;
      border-bottom: 2px solid #f1f5f9;
      color: #64748b;
      font-size: 0.875rem;
      text-transform: uppercase;
      font-weight: 700;
    }
    .admin-table td {
      padding: 1rem;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .badge-success {
      background: #dcfce7;
      color: #166534;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .badge-danger {
      background: #fee2e2;
      color: #991b1b;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .btn-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-weight: 600;
    }
    .btn-danger { background: #ef4444; color: white; }
    .btn-success { background: #10b981; color: white; }
    .action-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #94a3b8;
    }
    .empty-state .material-icons {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .table-responsive {
      overflow-x: auto;
    }
    @media (max-width: 640px) {
      .admin-table th:nth-child(2), .admin-table td:nth-child(2) {
        display: none;
      }
    }
  `]
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'users';
  users: any[] = [];
  categories: any[] = [];
  newCat = { nome: '' };
  newAdmin = { nome: '', email: '', senha: '' };
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadCategories();
  }

  loadUsers() {
    this.http.get<any[]>(`${this.apiUrl}/users`).subscribe({
      next: (data) => this.users = data,
      error: () => this.toastService.error('Erro ao carregar usuários.')
    });
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:8080/api/public/categories').subscribe({
      next: (data) => this.categories = data,
      error: () => this.toastService.error('Erro ao carregar categorias.')
    });
  }

  toggleUser(id: number) {
    this.http.put(`${this.apiUrl}/users/${id}/toggle`, {}).subscribe({
      next: () => {
        this.toastService.success('Status do usuário atualizado.');
        this.loadUsers();
      },
      error: () => this.toastService.error('Erro ao atualizar status do usuário.')
    });
  }

  addAdmin() {
    if (!this.newAdmin.nome || !this.newAdmin.email || !this.newAdmin.senha) {
      this.toastService.error('Preencha todos os campos!');
      return;
    }
    this.http.post(`${this.apiUrl}/users/admin`, this.newAdmin).subscribe({
      next: () => {
        this.toastService.success('Administrador criado com sucesso!');
        this.newAdmin = { nome: '', email: '', senha: '' };
        this.loadUsers();
      },
      error: () => this.toastService.error('Erro ao criar administrador.')
    });
  }

  addCategory() {
    if (this.newCat.nome) {
      this.http.post(`${this.apiUrl}/categories`, this.newCat).subscribe({
        next: () => {
          this.toastService.success('Categoria adicionada.');
          this.newCat.nome = '';
          this.loadCategories();
        },
        error: () => this.toastService.error('Erro ao adicionar categoria.')
      });
    }
  }

  deleteCategory(id: number) {
    this.http.delete(`${this.apiUrl}/categories/${id}`).subscribe({
      next: () => {
        this.toastService.success('Categoria excluída.');
        this.loadCategories();
      },
      error: () => this.toastService.error('Erro ao excluir categoria.')
    });
  }
}
