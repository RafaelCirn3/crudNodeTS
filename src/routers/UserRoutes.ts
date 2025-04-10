import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    parcialUpdateUser,
    deleteUser
} from '../controllers/UserController';
import { login } from '../controllers/AuthController';
import { 
    authMiddleware,
    authorizeUser
} from '../middleware/AuthMiddleware';

const router = Router();

// 🔓 Rota pública de autenticação
router.post('/auth/login', login);

// 🔓 Criar novo usuário (registro)
router.post('/users', createUser);

// 🔐 Rotas protegidas (com middleware aplicado individualmente)
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware,authorizeUser, updateUser); 
router.patch('/users/:id',authMiddleware, parcialUpdateUser); 
router.delete('/users/:id', authMiddleware,authorizeUser, deleteUser);

export default router;
