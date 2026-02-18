_**Arquitetura do Sistema Espalhaí**_

## 1. Visão Geral

O Espalhaí será um sistema de classificados online que permitirá aos usuários anunciar produtos, serviços e vagas de emprego. A plataforma contará com funcionalidades de cadastro e autenticação de usuários, gerenciamento de anúncios com regras específicas para upload de imagens, um sistema de favoritos e denúncias, um chat em tempo real para comunicação entre usuários e um painel administrativo completo para gerenciamento do sistema.

- **Backend:** A aplicação será desenvolvida em **Java 17** com o framework **Spring Boot 3.x**. A segurança será gerenciada pelo **Spring Security** com autenticação baseada em **JWT (JSON Web Token)**. A persistência de dados será feita com **Spring Data JPA**, utilizando **MySQL** como banco de dados principal e **H2** para testes. A funcionalidade de chat em tempo real será implementada com **WebSocket** e o protocolo **STOMP**.
- **Frontend:** A interface do usuário será construída com **Angular 17+**. Para a estilização e componentes de UI, utilizaremos **Angular Material** e **Tailwind CSS**, garantindo uma experiência moderna e responsiva. A comunicação com o backend e a reatividade da aplicação serão gerenciadas com **RxJS** e o cliente **StompJS** para a conexão com o WebSocket.

## 2. Modelo de Dados (Entidades Principais)

A seguir, são apresentadas as principais entidades que comporão o modelo de dados do sistema.

| Entidade | Atributos | Descrição |
| :--- | :--- | :--- |
| **Usuário (User)** | `id`, `nome`, `email`, `senha`, `telefone`, `roles` (papeis), `status` | Armazena os dados dos usuários cadastrados. `roles` pode ser `ROLE_USER` ou `ROLE_ADMIN`, e `status` pode ser `ATIVO` ou `INATIVO`. |
| **Categoria (Category)** | `id`, `nome`, `descricao` | Define as categorias para os anúncios, que são gerenciadas exclusivamente pelos administradores. |
| **Anúncio (Ad)** | `id`, `titulo`, `descricao`, `categoria_id`, `usuario_id`, `tipo`, `status`, `data_criacao`, `imagens` | Representa um anúncio na plataforma. O `tipo` pode ser `PRODUTO`, `SERVICO` ou `VAGA`, e o `status` pode ser `ATIVO`, `INATIVO` ou `CONCLUIDO`. |
| **Favorito (Favorite)** | `id`, `usuario_id`, `anuncio_id` | Registra quando um usuário marca um anúncio como favorito, criando uma relação entre `User` e `Ad`. |
| **Denúncia (Report)** | `id`, `usuario_id` (denunciante), `anuncio_id`, `motivo`, `data`, `status` | Armazena as denúncias feitas pelos usuários sobre anúncios. O `status` pode ser `PENDENTE` ou `PROCESSADA`. |
| **Mensagem (Message)** | `id`, `remetente_id`, `destinatario_id`, `conteudo`, `timestamp`, `lida` | Representa uma mensagem trocada no chat privado entre dois usuários. O campo `lida` indica se a mensagem foi visualizada. |

## 3. Regras de Negócio de Imagens

O sistema impõe regras estritas para o upload de imagens, que serão validadas tanto no frontend quanto no backend para garantir a consistência dos dados.

- **Produto:** Mínimo de **1** e máximo de **10** imagens.
- **Serviço:** De **0** a **3** imagens (opcional).
- **Vaga de Emprego:** Mínimo de **1** e máximo de **3** imagens.
- **Tamanho Máximo:** Cada imagem não pode exceder **10 MB**.

## 4. Fluxo de Autenticação

A autenticação será baseada em tokens JWT, garantindo uma comunicação segura entre o frontend e o backend. Existirá uma distinção clara entre os acessos de usuários comuns e administradores.

- **Tokens JWT:** Serão utilizados para gerenciar as sessões dos usuários após o login.
- **Login de Administrador:** O login para administradores será feito através da mesma interface, mas o sistema identificará o papel (`ROLE_ADMIN`) do usuário e redirecionará para o painel administrativo exclusivo.
