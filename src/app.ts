import express from 'express';
import type { AppConfig } from './config/env';
import type { DatabaseConfig } from './infrastructure/database/database';
import { buildDatabase } from './infrastructure/database/database';
import { consoleLogger } from './infrastructure/logger/console.logger';
import { utils } from './utils';
import { initModels } from './infrastructure/database/initModels';
import { buildUserModule } from './modules/user';
import { MailService } from './infrastructure/email/MailService';
import { registerRoutes } from './http/router/RegisterRoutes';

export function getDatabaseConfig(config: AppConfig): DatabaseConfig {
    return {
        host: config.DB_HOST,
        port: config.DB_PORT,
        name: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
    };
}

export async function buildApp({ config }: { config: AppConfig }) {
    const app = express();

    app.use(express.json());

    /**
    * Build DB
    */
    const dbConfig = getDatabaseConfig(config);
    const db = buildDatabase({ config: dbConfig });

    /**
     * Fail fast if DB is unreachable
     */
    const connection = await db.connect();
    const models = initModels(db.sequelize);
    const dependencies = {
        db,
        logger: consoleLogger,
        utils,
        models,
        mailService: new MailService(),
    };

    const userModule = buildUserModule({
        db: dependencies.db,
        util: dependencies.utils,
        models: dependencies.models,
        mailService: dependencies.mailService,
    });

    registerRoutes(app, [
        { prefix: '/users', router: userModule.router },
    ]);
    return app;
}
