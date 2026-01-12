// models/BaseAttributes.ts
import { DataTypes } from 'sequelize';

export const BaseAttributes = {
    recordStatus: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1, // 1 = active, 0 = inactive
    },

    createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
    },
};
