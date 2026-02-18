# Espalhaí - Sistema de Anúncios e Chat

Sistema completo desenvolvido com **Spring Boot 3** (Backend) e **Angular 17+**.

## 🚀 Como Executar Localmente

### 1. Backend (Java Spring Boot)
- **Pré-requisitos:** JDK 17 ou superior instalado.
- **Como rodar:**
  1. Extraia o arquivo `espalhai-backend-v2.zip`.
  2. No terminal, dentro da pasta `backend`, execute:
     - Linux/Mac: `./mvnw spring-boot:run`
     - Windows: `mvnw.cmd spring-boot:run`
- **Porta:** O servidor rodará em `http://localhost:8080`.
- **Banco de Dados:** Utiliza H2 (em memória). Acesse o console em `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:espalhaidb`).

### 2. Frontend (Angular)
- **Pré-requisitos:** Node.js 18+ e NPM instalados.
- **Como rodar:**
  1. Extraia o arquivo `espalhai-frontend-v2.zip`.
  2. No terminal, dentro da pasta `frontend`, execute:
     ```bash
     npm install
     npm start
     ```
- **Porta:** Acesse `http://localhost:4200` no seu navegador.

## ✨ Funcionalidades Implementadas
- **Autenticação:** Cadastro e Login com segurança JWT.
- **Anúncios:** Criação e listagem de Produtos, Serviços e Vagas com regras de imagens.
- **Design Moderno:** Interface responsiva e elegante.
- **Chat em Tempo Real:** Comunicação privada entre usuários via WebSockets.
- **Painel Admin:** Gestão de usuários e categorias.

---
Desenvolvido por Manus.
