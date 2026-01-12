// infrastructure/database/hooks.ts
import { Sequelize } from 'sequelize';

export function registerGlobalHooks(sequelize: Sequelize) {
    console.log('Registering global hooks');
    console.log(sequelize.addHook)
    sequelize.addHook('beforeValidate', (instance: any) => {
        console.log(instance, 'instance');
        if ('created_at' in instance && !instance.created_at) {
            instance.created_at = new Date();
        }

        if ('recordStatus' in instance && instance.recordStatus == null) {
            instance.recordStatus = 1;
        }
    });

    sequelize.addHook('beforeUpdate', (instance: any) => {
        if ('updatedAt' in instance) {
            instance.updatedAt = new Date();
        }
    });
}
