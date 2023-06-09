const UserController = require('./user-controller');
const ProjectController = require('./project-controller');
const MentorController = require('./mentor-controller');
const NotificationController = require('./notification-controller');
const ProposalController = require('./proposal-controller');

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
      model.UserFeedback,
      model.DailyMentoringApplicant,
      model.DailyMentoring,
      model.sequelize.transaction.bind(model.sequelize),
    );
    this.project = new ProjectController(
      log,
      helper,
      model.Proposal,
      model.User,
      model.Project,
      model.ProjectMentorship,
      model.Notification,
      model.sequelize.transaction.bind(model.sequelize),
      model.UserSkill,
    );
    this.mentor = new MentorController(
      log,
      helper,
      model.DailyMentoring,
      model.User,
      model.UserSkill,
      model.DailyMentoringApplicant,
      model.Notification,
    );
    this.notification = new NotificationController(
      log,
      helper,
      model.Notification,
      model.User,
    );
    this.proposal = new ProposalController(
      log,
      helper,
      model.Proposal,
      model.User,
      model.Project,
    );
  }

  ping = async (req, res) => {
    this.helper.httpRespSuccess(req, res, 200, 'PONG!!', null);
  };
};
