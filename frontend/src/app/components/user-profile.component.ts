import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdService } from '../services/ad.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <div style="max-width: 1000px; margin: 2rem auto; padding: 0 1rem;">
      <!-- Cabeçalho do Perfil -->
      <div *ngIf="user" style="background: white; border-radius: 1.5rem; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); margin-bottom: 2rem;">
        <!-- Banner de Fundo -->
        <div style="height: 150px; background: linear-gradient(135deg, #2563eb, #1d4ed8);"></div>
        
        <!-- Conteúdo do Perfil -->
        <div style="padding: 2rem; padding-top: 0;">
          <!-- Foto e Informações -->
          <div style="display: flex; gap: 2rem; align-items: flex-start;">
            <!-- Foto de Perfil -->
            <div style="width: 140px; height: 140px; border-radius: 50%; border: 5px solid white; background: #f1f5f9; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: -70px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <img *ngIf="user.fotoBase64" [src]="user.fotoBase64" style="width: 100%; height: 100%; object-fit: cover;">
              <span *ngIf="!user.fotoBase64" class="material-icons" style="font-size: 4rem; color: #94a3b8;">person</span>
            </div>
            
            <!-- Informações do Usuário -->
            <div style="flex: 1; padding-top: 1rem;">
              <h1 style="font-size: 2rem; font-weight: 800; color: #1e293b; margin: 0 0 0.5rem 0;">{{user.nome}}</h1>
              
              <div style="display: flex; flex-direction: column; gap: 0.75rem; color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-icons" style="font-size: 1.1rem; color: #2563eb;">location_on</span>
                  <span>{{user.cidade}}, {{user.estado}}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-icons" style="font-size: 1.1rem; color: #2563eb;">calendar_today</span>
                  <span>Membro desde {{user.dataCadastro | date:'MMMM de yyyy'}}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-icons" style="font-size: 1.1rem; color: #2563eb;">phone</span>
                  <span>{{user.telefone || 'Não informado'}}</span>
                </div>
              </div>
              
              <!-- Botão WhatsApp -->
              <a *ngIf="user.telefone" 
                 [href]="'https://wa.me/55' + user.telefone.replace(/\\D/g, '')" 
                 target="_blank"
                 style="background: #25d366; color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: all 0.2s; cursor: pointer;"
                 onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 4px 12px rgba(37,211,102,0.3)'"
                 onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                <span class="material-icons" style="font-size: 1.25rem;">whatsapp</span>
                Enviar Mensagem
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de Anúncios -->
      <div style="margin-top: 3rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0;">Anúncios Ativos</h2>
          <span style="background: #e0e7ff; color: #2563eb; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; font-size: 0.9rem;">{{ads.length}}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          <div *ngFor="let ad of ads" 
               class="ad-card" 
               style="background: white; border-radius: 1rem; overflow: hidden; border: 1px solid #e2e8f0; cursor: pointer; transition: all 0.3s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);"
               [routerLink]="['/home']" 
               [queryParams]="{adId: ad.id}"
               onmouseover="this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'; this.style.transform='translateY(-4px)'"
               onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'; this.style.transform='translateY(0)'">
            
            <!-- Imagem do Anúncio -->
            <div style="height: 200px; background: #f8fafc; position: relative; overflow: hidden;">
              <img [src]="ad.imagens && ad.imagens.length > 0 ? ad.imagens[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'" 
                   style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;"
                   onmouseover="this.style.transform='scale(1.05)'"
                   onmouseout="this.style.transform='scale(1)'">
              
              <!-- Badge de Tipo -->
              <div style="position: absolute; top: 1rem; right: 1rem;">
                <span [style.background]="getTypeColor(ad.tipo)" 
                      style="color: white; padding: 0.4rem 0.9rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; display: inline-block;">
                  {{ad.tipo}}
                </span>
              </div>
            </div>
            
            <!-- Informações do Anúncio -->
            <div style="padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0 0 0.75rem 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">{{ad.titulo}}</h3>
              
              <div style="color: #2563eb; font-weight: 800; font-size: 1.25rem; margin-bottom: 0.75rem;">
                R$ {{ad.valor | number:'1.2-2'}}
              </div>
              
              <div style="display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.85rem;">
                <span class="material-icons" style="font-size: 1rem;">location_on</span>
                <span>{{ad.cidade}}, {{ad.estado}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensagem de Vazio -->
        <div *ngIf="ads.length === 0" 
             style="text-align: center; padding: 4rem 2rem; background: #f8fafc; border-radius: 1rem; border: 2px dashed #e2e8f0; color: #64748b;">
          <span class="material-icons" style="font-size: 3rem; color: #cbd5e1; display: block; margin-bottom: 1rem;">shopping_cart</span>
          <p style="font-size: 1.1rem; margin: 0;">Nenhum anúncio ativo no momento.</p>
        </div>
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
    private toastService: ToastService,
    private router: Router
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
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar perfil do anunciante.');
        console.error(err);
      }
    });
  }

  loadAds(userId: number) {
    this.adService.getPublicAdsByUser(userId).subscribe({
      next: (data) => {
        this.ads = data || [];
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar anúncios do usuário.');
        console.error(err);
      }
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
