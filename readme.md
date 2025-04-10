
# CRUD de Usuários com Node.js, Express, Sequelize, MySQL e Docker

Este projeto é um CRUD básico de usuários utilizando Node.js, Express e Sequelize com banco de dados MySQL. Ele permite criar, listar, atualizar e deletar usuários, com autenticação via JWT e proteção de rotas. Agora com suporte completo à **dockerização** para facilitar o setup e execução do projeto.

## Pré-requisitos

- Docker e Docker Compose instalados
- (Opcional) Node.js (v18 ou superior) e MySQL instalados localmente para execução fora do Docker

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
PORT=3000

# JWT
JWT_SECRET=sua_chave_secreta

# DATABASE
DB_NAME=CRUDUSER
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_HOST=db
```


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

## Observações

- Com a dockerização, não é necessário ter MySQL localmente.
- Foi implementado um sistema de retry no Sequelize para garantir que a conexão só ocorra após o banco estar disponível.
- O token JWT expira em 1 hora.

## Licença

Este projeto está licenciado sob a licença MIT.
