import request from 'supertest';
import { app } from '../../server'; 
import { User } from '../../models/UserModel'; 

describe('Autenticação - Login', () => {
    beforeAll(async () => {
        try {
            // Limpa o banco de dados antes de cada teste
            await User.destroy({ where: {} });

            // Cria um usuário para o teste de login
            await User.create({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
                age : 20,
            });

            console.log('✅ Usuário de teste criado com sucesso');
        } catch (err) {
            console.error('🔴 Erro ao preparar o banco para os testes:', err);
        }
    });

    it('deve realizar login com sucesso com credenciais válidas', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testuser@example.com',
            password: 'password123',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('deve falhar ao tentar login com senha incorreta', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'testuser@example.com',
            password: 'senhaerrada',
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Credenciais inválidas');
    });

    it('deve falhar ao tentar login com usuário inexistente', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'naoexiste@example.com',
            password: 'password123',
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Credenciais inválidas');
    });
});
