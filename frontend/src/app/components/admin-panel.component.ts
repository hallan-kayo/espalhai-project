import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  template: `
    <div class="admin-tabs">
      <button (click)="view = 'users'">Usuários</button>
      <button (click)="view = 'ads'">Anúncios</button>
      <button (click)="view = 'categories'">Categorias</button>
      <button (click)="view = 'reports'">Denúncias</button>
    </div>

    <div *ngIf="view === 'users'">
      <h3>Gerenciar Usuários</h3>
      <table>
        <tr *ngFor="let user of users">
          <td>{{ user.nome }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.ativo ? 'Ativo' : 'Inativo' }}</td>
          <td><button (click)="toggleUser(user.id)">Alternar Status</button></td>
        </tr>
      </table>
    </div>

    <div *ngIf="view === 'categories'">
      <h3>Categorias</h3>
      <input [(ngModel)]="newCat.nome" placeholder="Nome">
      <button (click)="addCategory()">Adicionar</button>
      <ul>
        <li *ngFor="let cat of categories">
          {{ cat.nome }} <button (click)="deleteCategory(cat.id)">Excluir</button>
        </li>
      </ul>
    </div>
  `
})
export class AdminPanelComponent implements OnInit {
  view = 'users';
  users: any[] = [];
  categories: any[] = [];
  newCat = { nome: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
    this.loadCategories();
  }

  loadUsers() { this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe(d => this.users = d); }
  loadCategories() { this.http.get<any[]>('http://localhost:8080/api/ads/public').subscribe(d => this.categories = d); }

  toggleUser(id: number) {
    this.http.post(`http://localhost:8080/api/admin/users/${id}/toggle-status`, {}).subscribe(() => this.loadUsers());
  }

  addCategory() {
    this.http.post('http://localhost:8080/api/admin/categories', this.newCat).subscribe(() => {
      this.newCat.nome = '';
      this.loadCategories();
    });
  }

  deleteCategory(id: number) {
    this.http.delete(`https//localhost:8080/api/admin/categories/${id}`).subscribe(() => this.loadCategories());
  }
}
