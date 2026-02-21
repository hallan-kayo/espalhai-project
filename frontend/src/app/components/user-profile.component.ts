import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../services/ad.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <div style="max-width: 1000px; margin: 2rem auto; padding: 0 1rem;">
      <div *ngIf="user" style="background: white; border-radius: 1.5rem; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <div style="height: 120px; background: linear-gradient(135deg, #2563eb, #1d4ed8);"></div>
        <div style="padding: 0 2rem 2rem; position: relative;">
          <div style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; background: #f1f5f9; position: absolute; top: -60px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img *ngIf="user.fotoBase64" [src]="user.fotoBase64" style="width: 100%; height: 100%; object-fit: cover;">
            <span *ngIf="!user.fotoBase64" class="material-icons" style="font-size: 4rem; color: #94a3b8;">person</span>
          </div>
          
          <div style="margin-top: 70px; display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h1 style="font-size: 1.875rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">{{user.nome}}</h1>
              <div style="display: flex; gap: 1rem; color: #64748b; font-size: 0.875rem;">
                <span style="display: flex; align-items: center; gap: 0.25rem;">
                  <span class="material-icons" style="font-size: 1rem;">location_on</span>
                  {{user.cidade}} - {{user.estado}}
                </span>
                <span style="display: flex; align-items: center; gap: 0.25rem;">
                  <span class="material-icons" style="font-size: 1rem;">calendar_today</span>
                  Membro desde {{user.dataCadastro | date:'MMMM yyyy'}}
                </span>
              </div>
            </div>
            
            <a *ngIf="user.telefone" 
               [href]="'https://wa.me/55' + user.telefone.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')" 
               target="_blank"
               style="background: #25d366; color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s;"
               onmouseover="this.style.transform='scale(1.05)'"
               onmouseout="this.style.transform='scale(1)'">
              <span class="material-icons">whatsapp</span>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <h2 style="font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-bottom: 1.5rem;">Anúncios Ativos ({{ads.length}})</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
        <div *ngFor="let ad of ads" class="ad-card" style="background: white; border-radius: 1rem; overflow: hidden; border: 1px solid #e2e8f0; cursor: pointer;" [routerLink]="['/home']" [queryParams]="{adId: ad.id}">
          <div style="height: 180px; background: #f8fafc; position: relative;">
            <img [src]="ad.imagens && ad.imagens.length > 0 ? ad.imagens[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 0.75rem; right: 0.75rem;">
              <span [style.background]="getTypeColor(ad.tipo)" style="color: white; padding: 0.25rem 0.75rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 700;">{{ad.tipo}}</span>
            </div>
          </div>
          <div style="padding: 1.25rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">{{ad.titulo}}</h3>
            <div style="color: #2563eb; font-weight: 800; font-size: 1.1rem;">R$ {{ad.valor | number:'1.2-2'}}</div>
          </div>
        </div>
      </div>

      <div *ngIf="ads.length === 0" style="text-align: center; padding: 4rem; background: #f8fafc; border-radius: 1rem; border: 2px dashed #e2e8f0; color: #64748b;">
        Nenhum anúncio ativo no momento.
      </div>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  user: any;
  ads: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private adService: AdService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.loadProfile(userId);
        this.loadAds(userId);
      }
    });
  }

  loadProfile(userId: number) {
    this.adService.getUserPublicProfile(userId).subscribe({
      next: (data) => this.user = data,
      error: () => this.toastService.error('Erro ao carregar perfil do anunciante.')
    });
  }

  loadAds(userId: number) {
    this.adService.getPublicAdsByUser(userId).subscribe({
      next: (data) => this.ads = data,
      error: () => this.toastService.error('Erro ao carregar anúncios do usuário.')
    });
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'PRODUTO': return '#3b82f6';
      case 'SERVICO': return '#10b981';
      case 'VAGA': return '#f59e0b';
      default: return '#94a3b8';
    }
  }
}
