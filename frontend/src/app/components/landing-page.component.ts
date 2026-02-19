import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <div style="font-family: 'Inter', sans-serif; color: #1e293b;">
      <!-- Hero Section -->
      <section style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 80px 20px; text-align: center; color: white;">
        <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 20px;">Espalhaí</h1>
        <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto 40px; opacity: 0.9;">
          A plataforma completa para você encontrar produtos, serviços e oportunidades de emprego na sua região.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center;">
          <a routerLink="/signup" style="background: white; color: #2563eb; padding: 15px 30px; border-radius: 8px; font-weight: 700; text-decoration: none; transition: transform 0.2s;">Começar Agora</a>
          <a routerLink="/login" style="background: rgba(255,255,255,0.1); color: white; padding: 15px 30px; border-radius: 8px; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.3);">Entrar</a>
        </div>
      </section>

      <!-- Features Section -->
      <section style="padding: 80px 20px; max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 60px;">O que você encontra aqui?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          <div style="padding: 30px; border-radius: 16px; background: #f8fafc; text-align: center;">
            <span class="material-icons" style="font-size: 3rem; color: #3b82f6; margin-bottom: 20px;">shopping_bag</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Produtos</h3>
            <p style="color: #64748b;">Anuncie ou compre produtos novos e usados com facilidade e segurança.</p>
          </div>
          <div style="padding: 30px; border-radius: 16px; background: #f8fafc; text-align: center;">
            <span class="material-icons" style="font-size: 3rem; color: #10b981; margin-bottom: 20px;">build</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Serviços</h3>
            <p style="color: #64748b;">Encontre profissionais qualificados para realizar os serviços que você precisa.</p>
          </div>
          <div style="padding: 30px; border-radius: 16px; background: #f8fafc; text-align: center;">
            <span class="material-icons" style="font-size: 3rem; color: #f59e0b; margin-bottom: 20px;">work</span>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Vagas de Emprego</h3>
            <p style="color: #64748b;">Conecte-se com as melhores oportunidades de trabalho no mercado.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="background: #f1f5f9; padding: 80px 20px; text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 20px;">Pronto para começar?</h2>
        <p style="margin-bottom: 40px; color: #64748b;">Junte-se a milhares de usuários e comece a anunciar hoje mesmo.</p>
        <a routerLink="/signup" style="background: #2563eb; color: white; padding: 15px 40px; border-radius: 8px; font-weight: 700; text-decoration: none;">Criar minha conta</a>
      </section>
    </div>
  `
})
export class LandingPageComponent {}
