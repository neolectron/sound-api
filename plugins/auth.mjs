import plugin from 'fastify-plugin';
import fetch from 'node-fetch';
import httpErr from 'http-errors';

export default plugin(async (fastify, opts) => {
  const { Forbidden, Unauthorized, ServiceUnavailable } = httpErr;
  const validateRequest = (access_token) =>
    fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw ServiceUnavailable(err);
      });

  fastify.decorate('authTwitch', async (req) => {
    const { access_token } = req.headers;

    if (!access_token) {
      throw Unauthorized();
    }

    const { user_id } = await validateRequest(access_token);
    const adminList = process.env.ADMIN_UID_LIST.split(',');

    if (!adminList.includes(user_id)) {
      throw Forbidden();
    }
  });
});
