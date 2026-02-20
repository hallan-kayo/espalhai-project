import { Component, OnInit } from '@angular/core';
import { AdService } from '../services/ad.service';

@Component({
  selector: 'app-ad-list',
  template: `
    <div style="padding: 1rem 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem;">
        <div>
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #1e293b; letter-spacing: -0.025em; margin-bottom: 0.5rem;">Explorar Anúncios</h1>
          <p style="color: #64748b; font-size: 1.125rem;">Encontre os melhores produtos, serviços e vagas perto de você.</p>
        </div>
        <div style="display: flex; gap: 1rem;">
          <a routerLink="/favorites" style="background: white; color: #ef4444; border: 1px solid #fee2e2; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
            <span class="material-icons">favorite</span>
            Favoritos
          </a>
          <a routerLink="/ad/create" class="btn-primary" style="text-decoration: none; display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem;">
            <span class="material-icons" style="font-size: 1.25rem;">add_circle</span>
            Criar Anúncio
          </a>
        </div>
      </div>

      <!-- Filtros -->
      <div style="background: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #e2e8f0; margin-bottom: 2.5rem; display: flex; gap: 1rem; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <span class="material-icons" style="color: #94a3b8;">filter_list</span>
        <select [(ngModel)]="filter.categoryId" (change)="loadAds()" style="padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; outline: none; flex: 1;">
          <option [ngValue]="null">Todas as Categorias</option>
          <option *ngFor="let cat of categories" [value]="cat.id">{{cat.nome}}</option>
        </select>
        <select [(ngModel)]="filter.tipo" (change)="loadAds()" style="padding: 0.5rem 1rem; border-radius: 0.5rem; border: 1px solid #cbd5e1; outline: none; flex: 1;">
          <option value="TODOS">Todos os Tipos</option>
          <option value="PRODUTO">Produtos</option>
          <option value="SERVICO">Serviços</option>
          <option value="VAGA">Vagas de Emprego</option>
        </select>
      </div>

      <div *ngIf="ads.length === 0" style="text-align: center; padding: 5rem 0; background: white; border-radius: 1rem; border: 2px dashed #e2e8f0;">
        <span class="material-icons" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 1rem;">search_off</span>
        <h3 style="color: #64748b; font-weight: 600;">Nenhum anúncio encontrado.</h3>
        <p style="color: #94a3b8;">Seja o primeiro a anunciar algo novo!</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
        <div *ngFor="let ad of ads" class="ad-card" style="background: white; border-radius: 1.25rem; overflow: hidden; border: 1px solid #e2e8f0; transition: all 0.3s ease; position: relative; cursor: pointer;" (click)="openDetails(ad)">
          <div style="position: relative; height: 200px; background: #f8fafc; overflow: hidden;">
            <img [src]="getAdImage(ad)" 
                 (error)="handleImageError($event, ad)"
                 style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;"
                 class="ad-image">
            <div style="position: absolute; top: 1rem; right: 1rem;">
              <span [style.background]="getTypeColor(ad.tipo)" style="color: white; padding: 0.35rem 0.85rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                {{ad.tipo}}
              </span>
            </div>
          </div>
          
          <div style="padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.3;">{{ad.titulo}}</h3>
              <button (click)="toggleFavorite($event, ad)" style="background: none; border: none; cursor: pointer; color: #ef4444; padding: 0;">
                <span class="material-icons" style="font-size: 1.5rem;">{{ isFavorite(ad) ? 'favorite' : 'favorite_border' }}</span>
              </button>
            </div>

            <!-- Localização -->
            <div style="display: flex; align-items: center; gap: 0.4rem; color: #64748b; font-size: 0.8rem; margin-bottom: 1rem;">
              <span class="material-icons" style="font-size: 1rem; color: #94a3b8;">location_on</span>
              {{ ad.cidade && ad.estado ? ad.cidade + ' - ' + ad.estado : 'Localização não informada' }}
            </div>
            
            <p style="color: #64748b; font-size: 0.9375rem; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
              {{ad.descricao}}
            </p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid #f1f5f9;">
              <div style="font-weight: 800; color: #2563eb; font-size: 1.1rem;">
                {{ getPriceLabel(ad) }}
              </div>
              <div style="color: #64748b; font-weight: 600; font-size: 0.875rem; display: flex; align-items: center; gap: 0.25rem;">
                Ver detalhes
                <span class="material-icons" style="font-size: 1.125rem;">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Detalhes -->
      <div *ngIf="selectedAd" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 20px;" (click)="closeDetails()">
        <div style="background: white; width: 100%; max-width: 800px; max-height: 90vh; border-radius: 24px; overflow-y: auto; position: relative;" (click)="$event.stopPropagation()">
          <button (click)="closeDetails()" style="position: absolute; top: 20px; right: 20px; background: white; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 10;">
            <span class="material-icons">close</span>
          </button>
          
          <div style="height: 400px; width: 100%; background: #f1f5f9;">
            <img [src]="getAdImage(selectedAd)" [alt]="selectedAd.titulo" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          
          <div style="padding: 40px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
              <div>
                <span [style.background]="getTypeColor(selectedAd.tipo)" style="color: white; padding: 0.4rem 0.8rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; display: inline-block;">
                  {{selectedAd.tipo}}
                </span>
                <h2 style="font-size: 2rem; font-weight: 800; color: #1e293b; margin: 0;">{{selectedAd.titulo}}</h2>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.75rem; font-weight: 800; color: #2563eb; margin-bottom: 5px;">{{ getPriceLabel(selectedAd) }}</div>
                <div style="color: #64748b; font-size: 0.875rem; display: flex; align-items: center; gap: 5px; justify-content: flex-end;">
                  <span class="material-icons" style="font-size: 1rem;">location_on</span>
                  {{ selectedAd.cidade }} - {{ selectedAd.estado }}
                </div>
              </div>
            </div>

            <div style="background: #f8fafc; border-radius: 16px; padding: 24px; margin-bottom: 30px;">
              <h4 style="margin: 0 0 12px 0; color: #475569; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">Descrição</h4>
              <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">{{selectedAd.descricao}}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 30px; border-top: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 48px; height: 48px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <span class="material-icons" style="color: #64748b;">person</span>
                </div>
                <div>
                  <div style="font-weight: 700; color: #1e293b;">{{selectedAd.usuario?.nome}}</div>
                  <div style="font-size: 0.875rem; color: #64748b;">Anunciante</div>
                </div>
              </div>
              <a [routerLink]="['/chat']" [queryParams]="{user: selectedAd.usuario?.id}" style="background: #2563eb; color: white; padding: 15px 30px; border-radius: 12px; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                <span class="material-icons">chat</span>
                Falar com vendedor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdListComponent implements OnInit {
  ads: any[] = [];
  categories: any[] = [];
  favorites: any[] = [];
  filter = { categoryId: null, status: 'ATIVO', tipo: 'TODOS' };
  selectedAd: any = null;

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.loadAds();
    this.loadCategories();
    this.loadFavorites();
  }

  loadAds() {
    this.adService.getAds(this.filter.categoryId || undefined, this.filter.status, this.filter.tipo).subscribe(data => this.ads = data);
  }

  loadCategories() {
    this.adService.getCategories().subscribe(data => this.categories = data);
  }

  loadFavorites() {
    this.adService.getFavorites().subscribe(data => this.favorites = data);
  }

  isFavorite(ad: any): boolean {
    return this.favorites.some(f => f.id === ad.id);
  }

  toggleFavorite(event: Event, ad: any) {
    event.stopPropagation();
    this.adService.toggleFavorite(ad.id).subscribe(() => {
      this.loadFavorites();
    });
  }

  openDetails(ad: any) {
    this.selectedAd = ad;
  }

  closeDetails() {
    this.selectedAd = null;
  }

  getPriceLabel(ad: any): string {
    if (ad.tipo === 'PRODUTO' && ad.preco) return `R$ ${ad.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (ad.tipo === 'SERVICO' && ad.valorServico) return `R$ ${ad.valorServico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (ad.tipo === 'VAGA' && ad.salario) return `R$ ${ad.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    return 'Consulte';
  }

  getAdImage(ad: any): string {
    if (ad.imagens && ad.imagens.length > 0) {
      return ad.imagens[0];
    }
    return this.getPlaceholderByType(ad.tipo);
  }

  getPlaceholderByType(type: string): string {
    const t = type?.toLowerCase();
    if (t === 'vaga') return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80';
    if (t === 'servico') return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80';
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';
  }

  handleImageError(event: any, ad: any) {
    event.target.src = this.getPlaceholderByType(ad.tipo);
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'PRODUTO': return 'linear-gradient(135deg, #3b82f6, #2563eb)';
      case 'SERVICO': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'VAGA': return 'linear-gradient(135deg, #f59e0b, #d97706)';
      default: return '#94a3b8';
    }
  }

  toggleFavorite(ad: any) {
    alert('Adicionado aos favoritos!');
  }
}
