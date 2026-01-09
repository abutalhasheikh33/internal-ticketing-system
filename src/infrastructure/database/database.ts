
import { buildSequelizeDatabase } from "./sequelize";
import { consoleLogger as logger } from "../logger/console.logger";

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}


export function buildDatabase({ config }: { config: DatabaseConfig }) {
  const sequelize = buildSequelizeDatabase(config);

  async function connect() {
    await sequelize.authenticate();
    logger.info("Database connection successful");
  }

  async function transaction<T>(fn: () => Promise<T>): Promise<T> {
    return sequelize.transaction(fn);
  }

  return {
    sequelize,
    connect,
    transaction,
  };
}
