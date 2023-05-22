module.exports = class ProjectController {
  constructor(
    log,
    helper,
    projectModel,
    proposalModel,
    userModel,
    projectMentorshipModel,
  ) {
    this.log = log;
    this.helper = helper;
    this.projectModel = projectModel;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
    this.projectMentorshipModel = projectMentorshipModel;
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
          freelancerId: user.id,
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

  createProjectMentorship = async (req, res, next) => {
    const { uid } = req.user;
    const { projectId } = req.params;
    const { budgetPercentage, restriction } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });
      if (user.roleId !== 2) {
        this.helper.httpRespError(
          req,
          res,
          403,
          'Forbidden',
          'You are not a mentor',
        );
        return;
      }

      const project = await this.projectModel.findOne({
        where: {
          id: projectId,
          mentorId: user.id,
        },
        attributes: ['id'],
        logging: this.log.logSqlQuery(req.context),
      });
      if (!project) {
        this.helper.httpRespError(
          req,
          res,
          403,
          'Forbidden',
          'You are not the mentor of this project',
        );
        return;
      }

      await this.projectMentorshipModel.create({
        projectId,
        mentorId: user.id,
        budgetPercentage,
        restriction,
      });

      this.helper.httpRespSuccess(req, res, 201, 'Proposal created', null);
    } catch (error) {
      next(error);
    }
  };

  updateProposalStatus = async (req, res, next) => {
    const { projectId, proposalId } = req.params;
    const { status, applicantId } = req.body;
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });

      if (user.roleId !== 2) {
        this.helper.httpRespError(
          req,
          res,
          403,
          'You do not have permission to update this proposal',
          null,
        );
        return;
      }

      const project = await this.projectModel.findOne({
        where: {
          id: projectId,
          mentorId: user.id,
        },
      });

      if (!project) {
        this.helper.httpRespError(
          req,
          res,
          403,
          'You do not have permission to update this proposal',
          null,
        );
        return;
      }

      const updateQuery = {
        status,
        updatedBy: `${user.id}`,
      };

      if (status === 'Accepted') {
        updateQuery.assigneeId = applicantId;
      }

      await this.proposalModel.update(updateQuery, {
        logging: this.log.logSqlQuery(req.context),
        where: {
          id: proposalId,
          projectId,
        },
      });

      this.helper.httpRespSuccess(req, res, 200, null, null);
    } catch (error) {
      next(error);
    }
  };
};
