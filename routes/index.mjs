const indexRoute = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    return { root: true };
  });
};

export default indexRoute;
