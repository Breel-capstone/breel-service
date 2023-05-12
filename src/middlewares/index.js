const { nanoid } = require('nanoid');
const Context = require('../../sdk/context');

const AuthMiddleware = require('./auth-middleware');

module.exports = class Middleware {
  constructor(config, log, authLib, routeHelper) {
    this.config = config;
    this.log = log;
    this.authLib = authLib;
    this.routeHelper = routeHelper;

    this.auth = new AuthMiddleware(authLib);
  }

  addFieldsToContext(req, res, next) {
    const context = new Context(
      nanoid(),
      req.get('user-agent'),
      req.get('accept-language') || 'en',
    );

    req.context = context;

    next();
  }

  bodyLogger = (req, res, next) => {
    this.log.info(req.context, `http client sent request, URI: ${req.url}`);

    next();

    this.log.info(
      req.context,
      `http client recieved response, URI: ${req.url}`,
    );
  };

  errorHandler = (error, req, res, next) => {
    const errCode = error.statusCode || 500;
    const errMessage = error.message || 'Internal Server Error';
    req.context.responseCode = errCode;

    this.log.error(req.context, errMessage);
    this.routeHelper.httpRespError(req, res, errCode, errMessage);
  };

  notFoundHandler = (req, res, next) => {
    this.log.error(req.context, 'Not Found');
    req.context.responseCode = 404;
    this.routeHelper.httpRespError(req, res, 404, 'Not Found');
  };
};
