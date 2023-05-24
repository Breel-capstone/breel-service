module.exports = class NotificationController {
  constructor(log, helper, notificationModel, userModel) {
    this.log = log;
    this.helper = helper;
    this.notificationModel = notificationModel;
    this.userModel = userModel;
  }

  getNotificationList = async (req, res, next) => {
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: {
          uid,
        },
        logging: this.log.logSqlQuery(req.context),
      });

      const notifications = await this.notificationModel.findAll({
        where: {
          userId: user.id,
        },
        order: [['createdAt', 'DESC']],
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, notifications, null);
    } catch (error) {
      next(error);
    }
  };
};
