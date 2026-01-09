import { Sequelize } from 'sequelize';
import type { DatabaseConfig } from './database';
import { transactionNamespace } from './transaction.context';
// 🔴 MUST be executed at module load time
Sequelize.useCLS(transactionNamespace);
export function buildSequelizeDatabase(config: DatabaseConfig) {
    const sequelize = new Sequelize(
        config.name,
        config.user,
        config.password,
        {
            host: config.host,
            port: config.port,
            dialect: 'mysql',
            logging: false,
            timezone: '+00:00',
        }
    );
    return sequelize;
}
