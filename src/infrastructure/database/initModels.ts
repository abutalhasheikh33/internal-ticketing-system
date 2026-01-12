// models/index.ts
import { Sequelize } from 'sequelize';

import { User } from '../../modules/user/models/User';

const models = {
    User,
};

export function initModels(sequelize: Sequelize) {
    // 1. init all models
    Object.values(models).forEach(model => {
        model.initModel(sequelize);
    });

    // 2. run associations
    Object.values(models).forEach(model => {
        if (typeof (model as any).associate === 'function') {
            (model as any).associate(models);
        }
    });

    return models;
}
