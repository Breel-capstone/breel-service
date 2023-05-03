const { nanoid } = require('nanoid');
const Context = require('../../sdk/context');

module.exports = class ControllerHelper {
  constructor(config, log) {
    this.config = config;
    this.log = log;
  }

  ping = async (req, res) => {
    this.httpRespSuccess(req, res, 200, null, null);
  };

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

  httpRespSuccess = (req, res, code, data, pagination) => {
    const now = new Date();
    const requestTimeElapsed =
      now.getTime() - req.context.requestStartTime.getTime();
    res.send({
      message: {
        title: 'Success',
        body: 'Request successful',
      },
      meta: {
        path: this.config.Meta.Host + req.url,
        statusCode: code,
        timestamp: now,
        requestId: req.context.requestId,
        timeElapsed: `${requestTimeElapsed}ms`,
      },
      data: data,
      pagination: pagination,
    });
    req.context.responseCode = code;
  };

  httpRespError = (req, res, code, message) => {
    const now = new Date();
    const requestTimeElapsed =
      now.getTime() - req.context.requestStartTime.getTime();
    res.send({
      message: {
        title: 'Error',
        body: message,
      },
      meta: {
        path: this.config.Meta.Host + req.url,
        statusCode: code,
        timestamp: now,
        requestId: req.context.requestId,
        timeElapsed: `${requestTimeElapsed}ms`,
      },
      data: null,
      pagination: null,
    });
    req.context.responseCode = code;
  };

  errorHandler = (error, req, res, next) => {
    const errCode = error.statusCode || 500;
    const errMessage = error.message || 'Internal Server Error';
    req.context.responseCode = errCode;

    this.log.error(req.context, errMessage);
    this.httpRespError(req, res, errCode, errMessage);
  };

  notFoundHandler = (req, res, next) => {
    this.log.error(req.context, 'Not Found');
    req.context.responseCode = 404;
    this.httpRespError(req, res, 404, 'Not Found');
  };
};
