module.exports = class ErrorLib {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
};
