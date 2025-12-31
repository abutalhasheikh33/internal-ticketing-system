
import { buildSequelizeDatabase } from "./sequelize";
import type { DatabaseConfig } from "./database.types";
import { consoleLogger as logger } from "./logger/console.logger";

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
