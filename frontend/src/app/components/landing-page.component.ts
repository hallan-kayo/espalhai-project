import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  template: `
    <div style="font-family: 'Inter', sans-serif; color: #1e293b;">
      <!-- Menu Superior -->
      <nav style="background: white; border-bottom: 1px solid #e2e8f0; height: 70px; position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; height: 100%;">
          <div routerLink="/landing" style="font-size: 1.5rem; font-weight: 800; color: #2563eb; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
            Espalhaí
          </div>
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <a routerLink="/login" style="color: #64748b; text-decoration: none; font-weight: 600; font-size: 0.95rem;">Entrar</a>
            <a routerLink="/signup" style="background: #2563eb; color: white; padding: 0.6rem 1.2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 700; font-size: 0.95rem; box-shadow: 0 4px 6px -1px rgba(37,99,235,0.2);">Começar Agora</a>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 100px 20px; text-align: center; color: white;">
        <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 20px; letter-spacing: -0.025em;">Espalhaí</h1>
        <p style="font-size: 1.25rem; max-width: 600px; margin: 0 auto 40px; opacity: 0.9; line-height: 1.6;">
          A plataforma completa para você encontrar produtos, serviços e oportunidades de emprego na sua região.
        </p>
        <div style="display: flex; gap: 20px; justify-content: center;">
          <a routerLink="/signup" style="background: white; color: #2563eb; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; transition: transform 0.2s; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">Criar Conta Grátis</a>
          <a routerLink="/login" style="background: rgba(255,255,255,0.1); color: white; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(4px);">Entrar</a>
        </div>
      </section>

      <!-- Features Section -->
      <section style="padding: 100px 20px; max-width: 1200px; margin: 0 auto;">
        <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 60px; font-weight: 800; color: #1e293b;">O que você encontra aqui?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          <div style="padding: 40px; border-radius: 24px; background: #f8fafc; text-align: center; border: 1px solid #f1f5f9; transition: transform 0.3s ease;">
            <div style="width: 80px; height: 80px; background: #dbeafe; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <span class="material-icons" style="font-size: 2.5rem; color: #2563eb;">shopping_bag</span>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 700;">Produtos</h3>
            <p style="color: #64748b; line-height: 1.6;">Anuncie ou compre produtos novos e usados com facilidade e segurança na sua comunidade.</p>
          </div>
          <div style="padding: 40px; border-radius: 24px; background: #f8fafc; text-align: center; border: 1px solid #f1f5f9; transition: transform 0.3s ease;">
            <div style="width: 80px; height: 80px; background: #d1fae5; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <span class="material-icons" style="font-size: 2.5rem; color: #10b981;">build</span>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 700;">Serviços</h3>
            <p style="color: #64748b; line-height: 1.6;">Encontre profissionais qualificados ou ofereça seus serviços para quem precisa.</p>
          </div>
          <div style="padding: 40px; border-radius: 24px; background: #f8fafc; text-align: center; border: 1px solid #f1f5f9; transition: transform 0.3s ease;">
            <div style="width: 80px; height: 80px; background: #fef3c7; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <span class="material-icons" style="font-size: 2.5rem; color: #f59e0b;">work</span>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 700;">Vagas de Emprego</h3>
            <p style="color: #64748b; line-height: 1.6;">Conecte-se com as melhores oportunidades de trabalho ou encontre o talento ideal.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section style="background: #f1f5f9; padding: 100px 20px; text-align: center;">
        <h2 style="font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Pronto para começar?</h2>
        <p style="margin-bottom: 40px; color: #64748b; font-size: 1.1rem;">Junte-se a milhares de usuários e comece a anunciar hoje mesmo.</p>
        <a routerLink="/signup" style="background: #2563eb; color: white; padding: 18px 50px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 1.1rem; box-shadow: 0 10px 15px -3px rgba(37,99,235,0.3);">Criar minha conta agora</a>
      </section>

      <footer style="padding: 40px; text-align: center; color: #94a3b8; font-size: 0.9rem; border-top: 1px solid #e2e8f0;">
        <p>&copy; 2026 Espalhaí - Conectando você ao que importa.</p>
      </footer>
    </div>
  `
})
export class LandingPageComponent {}
