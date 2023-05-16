module.exports = class ProjectController {
  constructor(log, helper, proposalModel, userModel) {
    this.log = log;
    this.helper = helper;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
  }

  createProjectProposal = async (req, res, next) => {
    const { uid } = req.user;
    const { projectId } = req.params;
    const { price, durationMonth, coverLetter } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id'],
        logging: this.log.logSqlQuery(req.context),
      });
      await this.proposalModel.create(
        {
          projectId,
          userId: user.id,
          price,
          durationMonth,
          coverLetter,
          createdBy: `${user.id}`,
          updatedBy: `${user.id}`,
        },
        {
          logging: this.log.logSqlQuery(req.context),
        },
      );

      this.helper.httpRespSuccess(req, res, 201, 'Proposal created', null);
    } catch (error) {
      next(error);
    }
  };

  updateProposalStatus = async (req, res, next) => {
    const { projectId, proposalId } = req.params;
    const { isApproved } = req.body;
    try {
      // TODO: check if project belongs to user
      await this.proposalModel.update(
        {
          isApproved,
        },
        {
          logging: this.log.logSqlQuery(req.context),
          where: {
            id: proposalId,
            projectId,
          },
        },
      );

      this.helper.httpRespSuccess(req, res, 200, null, null);
    } catch (error) {
      next(error);
    }
  };
};
