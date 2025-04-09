import { Request, Response } from 'express';
import { UserStore } from '../services/UserServices';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserStore.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        const user = await UserStore.getById(id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
        return;
    }

    try {
        const newUser = await UserStore.create({ name: nome, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;

    try {
        if (email && await UserStore.existsByEmail(email, id)) {
            res.status(400).json({ message: 'E-mail já está em uso.' });
            return;
        }

        const updatedUser = await UserStore.update(id, { name: nome, email });

        if (!updatedUser) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        const user = await UserStore.getById(id);

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
            return;
        }

        await UserStore.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
};
