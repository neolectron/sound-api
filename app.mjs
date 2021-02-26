import autoLoad from 'fastify-autoload';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = async (fastify, opts) => {
  // Do not touch the following lines

  // This loads all plugins defined in /plugins
  // those should be supported plugins that are reused
  fastify.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { ...opts },
  });
};

export default app;
