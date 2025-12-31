import express from 'express';
import type { AppConfig } from './config/env';
import type { DatabaseConfig } from './infrastructure/database/database.types';
import { buildDatabase } from './infrastructure/database/database';
import { consoleLogger } from './infrastructure/database/logger/console.logger';

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

    const dependencies = {
        db,
        logger: consoleLogger,
    };

    // later:
    // buildDatabase({ config })
    // buildModules({ config, db })

    return app;
}
