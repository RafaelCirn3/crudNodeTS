import { UserInterface } from '../interfaces/UserInterface';
import { User } from '../models/UserModel';

export const UserStore = {
    getAll: async (): Promise<UserInterface[]> => {
        const users = await User.findAll();
        return users.map(user => user.toJSON() as UserInterface);
    },

    getById: async (id: number): Promise<UserInterface | null> => {
        const user = await User.findByPk(id);
        return user ? (user.toJSON() as UserInterface) : null;
    },

    create: async (user: UserInterface): Promise<UserInterface> => {
        const createdUser = await User.create(user as any);
        return createdUser.toJSON() as UserInterface;
    },

    update: async (id: number, data: Partial<UserInterface>): Promise<UserInterface | null> => {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.update(data as any);
        return user.toJSON() as UserInterface;
    },

    delete: async (id: number): Promise<void> => {
        await User.destroy({ where: { id } });
    },

    existsByEmail: async (email: string, excludeId?: number): Promise<boolean> => {
        const whereClause: any = { email };
        if (excludeId) whereClause.id = { $ne: excludeId };
        const user = await User.findOne({ where: whereClause });
        return !!user;
    }
};
