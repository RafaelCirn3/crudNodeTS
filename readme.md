# CRUD de Usuários com Node.js, Express, Sequelize e MySQL

Este projeto é um CRUD básico de usuários utilizando Node.js, Express e Sequelize com banco de dados MySQL. Ele permite criar, listar, atualizar e deletar usuários, com autenticação via JWT e proteção de rotas.

## Pré-requisitos

- Node.js (v18 ou superior recomendado)
- MySQL instalado e em execução
- Gerenciador de pacotes (npm ou yarn)

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
DB_HOST=localhost
```

Certifique-se de que o banco de dados MySQL esteja configurado com as credenciais acima.

## Comandos

### Iniciar o servidor em modo de desenvolvimento:

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
  Body: `{ "nome": "Nome do Usuário", "email": "usuario@email.com" }`

### Rotas Protegidas (Requer Token JWT)

Todas as rotas abaixo exigem o envio do token JWT no cabeçalho `Authorization` no formato `Bearer <token>`.

- `GET /api/users`  
  Retorna a lista de todos os usuários.

- `GET /api/users/:id`  
  Retorna os dados de um usuário específico.

- `PUT /api/users/:id`  
  Atualiza os dados de um usuário.  
  Body: `{ "nome": "Novo Nome", "email": "novo@email.com" }`

- `DELETE /api/users/:id`  
  Exclui um usuário.

## Middleware

### `authMiddleware`
Verifica se o token JWT é válido e anexa os dados do usuário autenticado ao objeto `req`.

### `authorizeUser`
Garante que o usuário autenticado só possa acessar ou modificar seus próprios dados.

## Estrutura do Projeto

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **Sequelize**: ORM para interação com o banco de dados MySQL.
- **JWT**: Autenticação baseada em tokens.
- **TypeScript**: Superset do JavaScript para tipagem estática.

## Observações

- Certifique-se de que o banco de dados MySQL esteja em execução antes de iniciar o servidor.
- O token JWT expira em 1 hora. Após esse período, será necessário realizar login novamente.

## Licença

Este projeto está licenciado sob a licença MIT.

