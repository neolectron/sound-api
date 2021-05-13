import plugin from 'fastify-plugin';
import staticPlugin from 'fastify-static';
import { resolve } from 'path';

export default plugin(async function (fastify, opts) {
  console.log(`using ${process.env.DATA_FOLDER} as data folder`);
  fastify.register(staticPlugin, {
    root: resolve(process.env.DATA_FOLDER),
    prefix: '/data/',
  });
});
