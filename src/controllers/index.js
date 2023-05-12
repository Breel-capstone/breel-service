const UserController = require('./user-controller');

module.exports = class Controller {
  constructor(log, config, helper, authLib, model) {
    this.log = log;
    this.helper = helper;
    this.user = new UserController(
      log,
      config,
      helper,
      authLib,
      model.User,
      model.UserExperience,
      model.UserProject,
      model.userSkill,
      model.sequelize.transaction,
    );
  }

  ping = async (req, res) => {
    this.helper.httpRespSuccess(req, res, 200, 'PONG!!', null);
  };
};
