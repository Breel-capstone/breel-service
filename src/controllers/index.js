const UserController = require('./user-controller');
const ProjectController = require('./project-controller');
const MentorController = require('./mentor-controller');

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
      model.UserProjectExperience,
      model.UserSkill,
      model.sequelize.transaction.bind(model.sequelize),
    );
    this.project = new ProjectController(
      log,
      helper,
      model.Proposal,
      model.User,
    );
    this.mentor = new MentorController(log, helper, model.Mentor, model.User);
  }

  ping = async (req, res) => {
    this.helper.httpRespSuccess(req, res, 200, 'PONG!!', null);
  };
};
