const UserController = require('./user-controller');
const AnimalController = require('./animal-controller');

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
      model.UserSkill,
      model.sequelize.transaction.bind(model.sequelize),
    );
    this.animal = new AnimalController(model.Animal, helper, log);
  }

  ping = async (req, res) => {
    this.helper.httpRespSuccess(req, res, 200, 'PONG!!', null);
  };
};
