module.exports = class ProposalController {
  constructor(
    log,
    helper,
    proposalModel,
    userModel,
    projectModel,
  ) {
    this.log = log;
    this.helper = helper;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
    this.projectModel = projectModel;
  }

  proposalById = async (req, res, next) => {
    try {
      let userInfo;
      userInfo = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        where: { id: req.params.userId },
      });

      // User registered in firebase but not in database, ignore
      if (!userInfo) {
        throw new ErrorLib(`user with id ${req.param.userId} not found`, 500);
      }

      this.helper.httpRespSuccess(req, res, 200, userInfo, null);
    } catch (error) {
      next(error);
    }
  };


};
