module.exports = class Context {
  constructor(
    requestId = '',
    userAgent = '',
    acceptLanguage = '',
    requestStartTime = new Date(),
    responseCode = '',
  ) {
    this.requestId = requestId;
    this.userAgent = userAgent;
    this.acceptLanguage = acceptLanguage;
    this.requestStartTime = requestStartTime;
    this.responseCode = responseCode;
  }

  getAllFields = () => ({
    requestId: this.requestId,
    userAgent: this.userAgent,
    acceptLanguage: this.acceptLanguage,
    requestStartTime: this.requestStartTime,
    responseCode: this.responseCode,
  });
};
