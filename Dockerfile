FROM node:23-alpine

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta
EXPOSE 3000

# Inicia a API
CMD ["npm", "run", "dev"]
