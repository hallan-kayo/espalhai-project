import { Component, OnInit } from '@angular/core';
import { AdService } from '../services/ad.service';
import { LocalidadeService } from '../services/localidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-create',
  template: `
    <div style="max-width: 900px; margin: 2rem auto; padding: 0 1rem;">
      <div style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 2.25rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.5rem; color: #1e293b;">O que você quer anunciar?</h2>
        <p style="color: #64748b; font-size: 1.1rem;">Preencha os detalhes abaixo para publicar seu anúncio no Espalhaí.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 2rem;">
        <div style="background: white; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
          
          <div style="margin-bottom: 2rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.75rem; color: #475569;">TIPO DE ANÚNCIO</label>
            <div style="display: flex; gap: 1rem;">
              <button *ngFor="let t of types" 
                      type="button"
                      (click)="ad.tipo = t.value; onTypeChange()"
                      [style.background]="ad.tipo === t.value ? 'var(--primary-color)' : '#f8fafc'"
                      [style.color]="ad.tipo === t.value ? 'white' : '#64748b'"
                      [style.border-color]="ad.tipo === t.value ? 'var(--primary-color)' : '#e2e8f0'"
                      style="flex: 1; padding: 1rem; border-radius: 1rem; border: 1px solid; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                {{ t.label }}
              </button>
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">TÍTULO DO ANÚNCIO</label>
            <input type="text" [(ngModel)]="ad.titulo" placeholder="Ex: iPhone 15 Pro Max 256GB" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">CATEGORIA</label>
            <select [(ngModel)]="ad.categoria.id" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1;">
              <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.nome }}</option>
            </select>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">DESCRIÇÃO DETALHADA</label>
            <textarea [(ngModel)]="ad.descricao" rows="6" placeholder="Descreva as principais características, estado de conservação ou detalhes do serviço..." style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1; resize: none;"></textarea>
          </div>

          <div *ngIf="ad.tipo === 'PRODUTO'" style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">PREÇO (R$)</label>
            <input type="number" [(ngModel)]="ad.preco" placeholder="0.00" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1;">
          </div>

          <div *ngIf="ad.tipo === 'SERVICO'" style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">VALOR DO SERVIÇO (R$)</label>
            <input type="number" [(ngModel)]="ad.valorServico" placeholder="0.00" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1;">
          </div>

          <div *ngIf="ad.tipo === 'VAGA'" style="margin-bottom: 1.5rem;">
            <label style="display: block; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: #475569;">SALÁRIO (R$)</label>
            <input type="number" [(ngModel)]="ad.salario" placeholder="0.00" style="width: 100%; padding: 0.85rem; border-radius: 0.75rem; border: 1px solid #cbd5e1;">
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Localização via API IBGE -->
          <div style="background: white; padding: 1.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <h4 style="margin: 0 0 1.25rem 0; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; color: #64748b; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-icons" style="font-size: 1.25rem; color: var(--primary-color);">location_on</span>
              Localização
            </h4>
            
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.4rem; color: #94a3b8;">ESTADO (UF)</label>
              <select [(ngModel)]="ad.estado" (change)="onEstadoChange()" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                <option [ngValue]="null">Selecione o estado</option>
                <option *ngFor="let est of estados" [value]="est.sigla">{{ est.nome }}</option>
              </select>
            </div>

            <div>
              <label style="display: block; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.4rem; color: #94a3b8;">CIDADE</label>
              <select [(ngModel)]="ad.cidade" [disabled]="!ad.estado" style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
                <option [ngValue]="null">Selecione a cidade</option>
                <option *ngFor="let cid of cidades" [value]="cid.nome">{{ cid.nome }}</option>
              </select>
            </div>
          </div>

          <!-- Imagens -->
          <div style="background: white; padding: 1.5rem; border-radius: 1.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <h4 style="margin: 0 0 1.25rem 0; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; color: #64748b; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-icons" style="font-size: 1.25rem; color: var(--primary-color);">photo_camera</span>
              Imagens
            </h4>
            
            <div style="border: 2px dashed #e2e8f0; border-radius: 1rem; padding: 1.5rem; text-align: center; cursor: pointer; transition: all 0.2s;" 
                 (click)="fileInput.click()"
                 onmouseover="this.style.borderColor='var(--primary-color)';this.style.background='#f8fafc'" 
                 onmouseout="this.style.borderColor='#e2e8f0';this.style.background='transparent'">
              <input #fileInput type="file" (change)="onFileSelected($event)" multiple style="display: none">
              <i class="material-icons" style="font-size: 2.5rem; color: #94a3b8; margin-bottom: 0.5rem;">add_a_photo</i>
              <p style="font-size: 0.8rem; font-weight: 600; margin: 0; color: #475569;">Clique para enviar</p>
              <p style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.4rem;">{{ ad.imagens.length }} de {{ maxImages }} fotos</p>
            </div>

            <div style="margin-top: 1rem; padding: 0.75rem; background: #f0f9ff; border-radius: 0.75rem; font-size: 0.75rem; color: #0369a1;">
              <strong>Regras:</strong> Mínimo {{ minImages }} e Máximo {{ maxImages }} fotos.
            </div>
          </div>

          <button class="btn-primary" style="width: 100%; padding: 1.25rem; font-size: 1rem; box-shadow: 0 10px 15px -3px rgba(37,99,235,0.3);" [disabled]="!isValid()" (click)="save()">
            Publicar Anúncio
          </button>
        </div>
      </div>
    </div>
  `
})
export class AdCreateComponent implements OnInit {
  ad: any = { tipo: 'PRODUTO', titulo: '', descricao: '', imagens: [], categoria: { id: null }, estado: null, cidade: null };
  minImages = 1;
  maxImages = 10;
  categories: any[] = [];
  estados: any[] = [];
  cidades: any[] = [];
  types = [
    { label: '📦 Produto', value: 'PRODUTO' },
    { label: '🛠️ Serviço', value: 'SERVICO' },
    { label: '💼 Vaga', value: 'VAGA' }
  ];

  constructor(
    private adService: AdService, 
    private localidadeService: LocalidadeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.categories.length > 0) this.ad.categoria.id = this.categories[0].id;
    });

    this.localidadeService.getEstados().subscribe(data => {
      this.estados = data;
    });
  }

  onEstadoChange() {
    this.ad.cidade = null;
    if (this.ad.estado) {
      this.localidadeService.getCidades(this.ad.estado).subscribe(data => {
        this.cidades = data;
      });
    }
  }

  onTypeChange() {
    if (this.ad.tipo === 'PRODUTO') { this.minImages = 1; this.maxImages = 10; }
    else if (this.ad.tipo === 'SERVICO') { this.minImages = 0; this.maxImages = 3; }
    else if (this.ad.tipo === 'VAGA') { this.minImages = 1; this.maxImages = 3; }
    if (this.ad.imagens.length > this.maxImages) this.ad.imagens = this.ad.imagens.slice(0, this.maxImages);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      if (this.ad.imagens.length < this.maxImages && file.size <= 10 * 1024 * 1024) {
        this.ad.imagens.push(file.name);
      }
    }
  }

  isValid() {
    const basicInfo = this.ad.titulo && this.ad.descricao && 
           this.ad.imagens.length >= this.minImages && 
           this.ad.imagens.length <= this.maxImages &&
           this.ad.estado && this.ad.cidade;
    
    if (!basicInfo) return false;

    if (this.ad.tipo === 'PRODUTO') return !!this.ad.preco && this.ad.preco > 0;
    if (this.ad.tipo === 'SERVICO') return !!this.ad.valorServico && this.ad.valorServico > 0;
    if (this.ad.tipo === 'VAGA') return !!this.ad.salario && this.ad.salario > 0;

    return true;
  }

  save() {
    this.adService.createAd(this.ad).subscribe(() => {
      alert('Anúncio publicado com sucesso!');
      this.router.navigate(['/home']);
    });
  }
}
