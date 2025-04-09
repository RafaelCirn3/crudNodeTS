import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../services/UserServices';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;


export const login = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ mensagem: 'E-mail é obrigatório.' });
        return;
    }

    const users = await UserStore.getAll();
    const user = users.find(u => u.email === email);

    if (!user) {
        res.status(401).json({ mensagem: 'Credenciais inválidas.' });
        return;
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};
