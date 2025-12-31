import { buildApp } from './app';
import { config } from './config/env';

(async () => {
  const app = await buildApp({ config });

  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
  });
})();
