import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

export const authorizeUser = (req: Request, res: Response, next: NextFunction): void => {
    const userIdFromToken = req.user?.id;
    const userIdFromParams = parseInt(req.params.id);

    if (userIdFromToken !== userIdFromParams) {
        res.status(403).json({ message: 'Você não tem permissão para acessar esse recurso.' });
        return;
    }

    next();
};
