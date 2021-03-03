const teapotRoute = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    throw fastify.httpErr.ImATeapot();
  });
};
export default teapotRoute;
