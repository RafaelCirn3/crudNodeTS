import express from 'express';
import dotenv from 'dotenv';
import router from './src/routers/UserRoutes';
import { sequelize } from './src/database';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('🟢 Banco de dados sincronizado!');
        app.listen(PORT, () => {
            console.log(`link para o servidor: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('🔴 Erro ao sincronizar com o banco:', err);
    });
