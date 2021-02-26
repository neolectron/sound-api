import plugin from 'fastify-plugin';
import httpErr from 'http-errors';

export default plugin(async function (fastify, opts) {
  fastify.decorate('httpErr', httpErr);
});
