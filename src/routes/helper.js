module.exports = class RouteHelper {
  constructor(config, log) {
    this.config = config;
    this.log = log;
  }

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

  processPagination = (paginationQuery, currentElement, totalElement) => {
    let { limit, offset } = paginationQuery;
    limit = parseInt(limit) || 10;
    offset = parseInt(offset) || 0;
    const totalPage = Math.ceil(totalElement / limit);

    return {
      currentElement,
      totalElement,
      currentPage: Math.ceil(offset / limit) + 1,
      totalPage,
    };
  };

  httpRespError = (req, res, code, message) => {
    const now = new Date();
    const requestTimeElapsed =
      now.getTime() - req.context.requestStartTime.getTime();
    res.status(code).send({
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
};
