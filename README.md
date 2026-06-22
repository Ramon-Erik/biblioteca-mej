# 📚 Biblioteca MEJ

> Sistema moderno de gerenciamento e reserva de acervos literários focado na experiência fluida do leitor e no controle total da administração.

---

## 🛠️ Tecnologias e Ecossistema

### Frontend
* **Angular 20 (Standalone Components)**: Arquitetura limpa e escalável utilizando as últimas diretrizes da engine do Angular.
* **RxJS & Estado Reativo**: Gerenciamento de fluxo de dados assíncronos por meio de `BehaviorSubject`, `switchMap` e operadores avançados.
* **Bootstrap 5 & Ng-Bootstrap**: Interface elegante, responsiva e estruturada sobre modais funcionais nativos.
* **Ngx-Toastr & Animations**: Feedbacks visuais e notificações em tempo real integradas aos gatilhos do back-end.

### Backend
* **Java & Spring Boot**: Core da API RESTful estruturada para alta performance.
* **Spring Data JPA & MySQL**: Persistência de dados segura com controle transacional e atualizações automáticas de esquemas (`ddl-auto: update`).
* **Segurança**: Autenticação e autorização robustas alimentadas por Tokens baseados em **JWT**.

---

## Requisitos do Sistema (Escopo Funcional)

O sistema divide suas operações de forma inteligente com base no perfil de acesso autenticado (Leitor vs. Administrador).

### Módulo do Leitor / Visitante
* **Catálogo Inteligente**: Consulta pública filtrável por categorias e indexada por paginação reativa. Oculta automaticamente obras restritas ou fora de circulação.
* **Cadastro com Autenticação**: Registro com validação de senha forte e fluxo de dupla autenticação (OTP) via e-mail obrigatório com tempo de expiração de 5 minutos.
* **Fluxo de Reserva Autônomo**: Solicitação de livro físico com regras restritas (proibido o pedido se houver atrasos, suspensões ativas ou se já possuir um livro em posse).
* **Renovação Antecipada**: Permite estender o prazo original de 15 dias por até 5 vezes seguidas, desde que a solicitação seja feita antes do vencimento do prazo atual.
* **Perfil do Leitor**: Painel exclusivo para monitorar o livro atual em posse (título, capa e histórico de movimentações daquela cópia).

### Módulo Administrativo (Gestão & Auditoria)
* **Visibilidade Expandida do Catálogo**: Acesso irrestrito a livros disponíveis, indisponíveis e ocultados por motivos internos.
* **CRUD de Obras com Anti-Duplicidade**: Sistema inteligente que bloqueia o cadastro de títulos idênticos no banco de dados.
* **Efetivação de Empréstimos e Devoluções**: Validação manual das saídas e retornos de livros, intermediada por modais de confirmação e automação de e-mails para o leitor.
* **Ocultação de Livros**: Alternativa segura à exclusão de registros. Permite retirar o livro da vista do público informando um motivo de auditoria (funciona mesmo para livros atualmente locados).
* **Gestão de Acessos**: Painel com listagem de usuários para atribuição de cargos (Promover/Rebaixar Admin) e revogação de acessos (Bloqueio com justificativa).

---

## 🚀 Executão do Projeto

### Pré-requisitos
Certifique-se de possuir instalado em sua máquina de desenvolvimento:
* **Node.js** (v20 ou superior) & npm
* **Java JDK 21**
* **MySQL Server** (ou instância ativa via Docker)

### API Backend

https://github.com/ithlima/biblioteca-api#
