import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    age : {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});
