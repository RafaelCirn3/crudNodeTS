import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        retry: {
            max: 10 // tenta 10 vezes
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000, // espera até 30s para obter conexão
            idle: 10000
        }
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('🟢 Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('🔴 Erro ao conectar com o banco de dados:', error);
    }
};
