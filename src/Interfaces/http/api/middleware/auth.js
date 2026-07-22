import AuthenticationTokenManager from '../../../../Applications/security/AuthenticationTokenManager.js';
import AuthenticationError from '../../../../Commons/exceptions/AuthenticationError.js';

const createAuthMiddleware = (container) => async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AuthenticationError('Missing authentication');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new AuthenticationError('Invalid authentication');
    }

    const tokenManager = container.getInstance(AuthenticationTokenManager.name);
    await tokenManager.verifyAccessToken(token);

    req.auth = {
      credentials: await tokenManager.decodePayload(token),
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default createAuthMiddleware;
