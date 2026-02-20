import { Component, OnInit } from '@angular/core';
import { AdService } from '../services/ad.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-favorites',
  template: `
    <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
      <h1 style="font-size: 2.5rem; font-weight: 800; color: #1e293b; margin-bottom: 40px; display: flex; align-items: center; gap: 15px;">
        <span class="material-icons" style="font-size: 2.5rem; color: #ef4444;">favorite</span>
        Meus Favoritos
      </h1>

      <div *ngIf="loading" style="text-align: center; padding: 60px;">
        <p style="color: #64748b; font-size: 1.1rem;">Carregando seus favoritos...</p>
      </div>

      <div *ngIf="!loading && favorites.length === 0" style="text-align: center; padding: 80px; background: #f8fafc; border-radius: 24px; border: 2px dashed #e2e8f0;">
        <span class="material-icons" style="font-size: 4rem; color: #cbd5e1; margin-bottom: 20px;">favorite_border</span>
        <h2 style="font-size: 1.5rem; color: #475569; margin-bottom: 10px;">Você ainda não favoritou nada.</h2>
        <p style="color: #94a3b8; margin-bottom: 30px;">Explore os anúncios e salve os que você mais gostou!</p>
        <a routerLink="/home" style="background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; font-weight: 700; text-decoration: none;">Explorar Anúncios</a>
      </div>

      <div *ngIf="!loading && favorites.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
        <div *ngFor="let ad of favorites" style="background: white; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: transform 0.2s ease-in-out;">
          <div style="position: relative; height: 200px; overflow: hidden; cursor: pointer;" (click)="viewDetails(ad)">
            <img [src]="getAdImage(ad)" [alt]="ad.titulo" (error)="handleImageError($event, ad)" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 12px; left: 12px;">
              <span [style.background]="getTypeColor(ad.tipo)" style="color: white; padding: 0.4rem 0.8rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                {{ad.tipo}}
              </span>
            </div>
          </div>
          
          <div style="padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0; cursor: pointer;" (click)="viewDetails(ad)">{{ad.titulo}}</h3>
              <button (click)="removeFavorite(ad)" style="background: none; border: none; cursor: pointer; color: #ef4444; padding: 0;">
                <span class="material-icons" style="font-size: 1.5rem;">favorite</span>
              </button>
            </div>
            
            <p style="color: #64748b; font-size: 0.9375rem; margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5;">
              {{ad.descricao}}
            </p>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid #f1f5f9;">
              <div style="font-weight: 800; color: #2563eb; font-size: 1.1rem;">
                {{ getPriceLabel(ad) }}
              </div>
              <button (click)="viewDetails(ad)" style="background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; font-size: 0.875rem; display: flex; align-items: center; gap: 4px;">
                Ver Detalhes
                <span class="material-icons" style="font-size: 1.1rem;">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  loading = true;

  constructor(
    private adService: AdService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.adService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Erro ao carregar favoritos.');
      }
    });
  }

  removeFavorite(ad: any) {
    this.adService.toggleFavorite(ad.id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.id !== ad.id);
        this.toastService.success('Removido dos favoritos.');
      },
      error: () => this.toastService.error('Erro ao remover favorito.')
    });
  }

  viewDetails(ad: any) {
    this.router.navigate(['/home'], { queryParams: { adId: ad.id } });
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

  getPriceLabel(ad: any): string {
    if (ad.tipo === 'PRODUTO' && ad.preco) return `R$ ${ad.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (ad.tipo === 'SERVICO' && ad.valorServico) return `R$ ${ad.valorServico.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (ad.tipo === 'VAGA' && ad.salario) return `R$ ${ad.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    return 'Consulte';
  }
}
