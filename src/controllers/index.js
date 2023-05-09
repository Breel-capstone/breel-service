const UserController = require('./user-controller');

module.exports = class Controller {
  constructor(log, helper, authLib) {
    this.log = log;
    this.helper = helper;
    this.user = new UserController(log, helper, authLib);
  }

  ping = async (req, res) => {
    this.helper.httpRespSuccess(req, res, 200, 'PONG!!', null);
  };
};
