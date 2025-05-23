import { Request, Response } from 'express';
import { UserStore } from '../services/UserServices';
import { User } from '../models/UserModel';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await UserStore.getPaginated(offset, limit);

        res.json({
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            users: rows,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários com paginação.' });
    }
};
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
        const user = await UserStore.getById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, age } = req.body;
    if (!name || !email) {
        res.status(400).json({ message: 'name e e-mail são obrigatórios.' });
    }
    try {
        if (await UserStore.existsByEmail(email)) {
            res.status(400).json({ message: 'email já está em uso.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao verificar e-mail.' });
    }
    try {
        const newUser = await UserStore.create({ name: name, email, age });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { name, email, age } = req.body;
    try {
        if (email && await UserStore.existsByEmail(email, id)) {
            res.status(400).json({ message: 'E-mail já está em uso.' });
        }
        const updatedUser = await UserStore.update(id, { name: name, email, age });
        if (!updatedUser) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

export const parcialUpdateUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const { name, email, age } = req.body;

    try {
        const user = await UserStore.getById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (email && await UserStore.existsByEmail(email, id)) {
            res.status(400).json({ message: 'E-mail já está em uso.' });
        }
        const updatedFields: Partial<typeof user> = {};
        if (name !== undefined) updatedFields.name = name;
        if (email !== undefined) updatedFields.email = email;
        if (age !== undefined) updatedFields.age = age;
        const updatedUser = await UserStore.update(id, updatedFields);
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    try {
        const user = await UserStore.getById(id);
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        await UserStore.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
};
