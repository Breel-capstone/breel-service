const ErrorLib = require('../../sdk/errorlib');

module.exports = class AuthMiddleware {
  constructor(authLib) {
    this.authLib = authLib;
  }

  verifyToken = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new ErrorLib('Unauthorized: Token is Required', 401);
      }
      const token = authorization.split(' ')[1];
      const decoded = await this.authLib.getUser(token);
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};
