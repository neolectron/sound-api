import plugin from 'fastify-plugin';
import fetch from 'node-fetch';
import httpErr from 'http-errors';

export default plugin(async (fastify, opts) => {
  const { Forbidden, Unauthorized } = httpErr;

  const validateRequest = (access_token) =>
    fetch('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${access_token}`,
      },
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw httpErr(res.status, res.statusText);
        }
        return res;
      })
      .then((res) => res.json());

  fastify.decorate('authTwitch', async (req) => {
    const { authorization } = req.headers;

    const access_token = authorization.split(' ')[1];

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
