const adminRoute = async (fastify) => {
  fastify.get('/', async () => process.env.ADMIN_UID_LIST.split(','));
};

export default adminRoute;
