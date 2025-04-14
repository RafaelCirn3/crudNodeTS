
# CRUD de Usuários com Node.js, Express, Sequelize, MySQL e Docker

Este projeto é um CRUD básico de usuários utilizando Node.js, Express e Sequelize com banco de dados MySQL. Ele permite criar, listar, atualizar e deletar usuários, com autenticação via JWT e proteção de rotas. 

## Pré-requisitos

- Docker e Docker Compose instalados
- (Opcional) Node.js (v18 ou superior) e MySQL instalados localmente para execução fora do Docker

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/RafaelCirn3/crudNodeTS
cd crudNodeTS
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto seguindo o exemplo preesente no .env.example

## Utilizando Docker

### Subir os containers

```bash
docker-compose up --build
```

Esse comando irá construir a imagem da API e iniciar tanto o container do MySQL quanto da API Node.js.

### Acessar a aplicação

A API estará disponível em: `http://localhost:3000`

## Comandos Úteis

### Iniciar o servidor em modo de desenvolvimento (fora do Docker):

```bash
npm run dev
```

## Mapeamento de Rotas

### Rotas Públicas

- `POST /api/auth/login`  
  Autentica o usuário e retorna um token JWT.  
  Body: `{ "email": "usuario@email.com" }`

- `POST /api/users`  
  Cria um novo usuário.  
  Body: `{ "name": "nome do Usuário", "email": "usuario@email.com" }`

### Rotas Protegidas (Requer Token JWT)

Todas as rotas abaixo exigem o envio do token JWT no cabeçalho `Authorization` no formato `Bearer <token>`.

- `GET /api/users`  
  Retorna a lista de todos os usuários.

- `GET /api/users/:id`  
  Retorna os dados de um usuário específico.

- `PUT /api/users/:id`  
  Atualiza os dados de um usuário.  
  Body: `{ "name": "Novo nome", "email": "novo@email.com" }`

- `PATCH /api/users/:id`  
  Atualiza parcialmente os dados de um usuário

- `DELETE /api/users/:id`  
  Exclui um usuário.

## 🧪 Como importar as rotas no Insomnia

Para facilitar os testes da API, você pode importar um arquivo JSON com todas as rotas configuradas. Siga os passos abaixo:

### 📥 Passo a passo para importar no Insomnia

1. Abra o **Insomnia**.
2. Clique no menu principal (ícone de hambúrguer no canto superior esquerdo).
3. Selecione **Import > From File**.
4. Escolha o arquivo `template_api_insomnia.json` incluído neste repositório.
5. O workspace "API Usuários" será criado automaticamente com todas as requisições organizadas:
    📁 Auth
    - Login
    - 📁 Usuários
    - Criar Usuário
    - Listar Todos os Usuários
    - Buscar Usuário por ID
    - Atualizar Usuário (PUT)
    - Atualizar Parcialmente (PATCH)
    - Deletar Usuário

### 🔐 Autenticação

- Após fazer login com um usuário válido, copie o token JWT retornado na resposta.
- No Insomnia, vá até o menu lateral esquerdo, clique no ícone de engrenagem do ambiente `Base Environment` e cole o token na variável `jwt_token`.

```json
{
  "base_url": "http://localhost:3000/api",
  "jwt_token": "cole_seu_token_aqui"
}
```
## Middleware

### `authMiddleware`
Verifica se o token JWT é válido e anexa os dados do usuário autenticado ao objeto `req`.

### `authorizeUser`
Garante que o usuário autenticado só possa acessar ou modificar seus próprios dados.

## Estrutura do Projeto

- `src/models` – Definições Sequelize
- `src/database` - Ligação ao Banco de dados
- `src/interfaces` – Definição do Interface
- `src/controllers` – Lógica das rotas
- `src/routes` – Endpoints da API
- `src/middlewares` – JWT e autorização
- `./server.ts` – Ponto de entrada da aplicação

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize**
- **MySQL**
- **Docker**
- **JWT**
- **TypeScript**
- **jest**
- **ts-test**

## Observações

- Com a dockerização, não é necessário ter MySQL localmente.
- Foi implementado um sistema de retry no Sequelize para garantir que a conexão só ocorra após o banco estar disponível.
- para execução dos Testes, certifique-se de estar com o banco de dados Ligado para fins de execução 
- O token JWT expira em 1 hora.

# FEITO POR:
```
      Rafael Cirne Medeiros, Estudante de Ciências da Computação, Unipê.
```
