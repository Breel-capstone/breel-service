const { Op } = require('sequelize');
module.exports = class ProjectController {
  constructor(
    log,
    helper,
    proposalModel,
    userModel,
    projectModel,
    projectMentorshipModel,
    notificationModel,
    dbTransaction,
  ) {
    this.log = log;
    this.helper = helper;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
    this.projectModel = projectModel;
    this.projectMentorshipModel = projectMentorshipModel;
    this.notificationModel = notificationModel;
    this.dbTransaction = dbTransaction;
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

  createProject = async (req, res, next) => {
    const { uid } = req.user;
    const { title, description, durationMonth, budget } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id'],
        logging: this.log.logSqlQuery(req.context),
      });
      await this.projectModel.create(
        {
          userId: user.id,
          title,
          description,
          durationMonth,
          budget,
        },
        {
          logging: this.log.logSqlQuery(req.context),
        },
      );

      this.helper.httpRespSuccess(req, res, 201, 'Project created', null);
    } catch (error) {
      next(error);
    }
  };

  updateProposalStatus = async (req, res, next) => {
    const { projectId, proposalId } = req.params;
    const { status, applicantId } = req.body;
    const { uid } = req.user;

    if (!['Accepted', 'Rejected'].includes(status)) {
      this.helper.httpRespError(
        req,
        res,
        400,
        'Status must be either Accepted or Rejected',
        null,
      );
      return;
    }

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId', 'fullName'],
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
        logging: this.log.logSqlQuery(req.context),
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

      dbTransaction = await this.dbTransaction({
        logging: this.log.logSqlQuery(req.context),
      });

      if (status === 'Accepted') {
        await this.proposalModel.update(
          { status, updatedBy: `${user.id}` },
          {
            where: {
              id: proposalId,
              projectId,
            },
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
        );

        await this.projectModel.update({
          status: 'Sedang Berjalan',
          assigneId: applicantId,
          updatedBy: `${user.id}`,
          transaction: dbTransaction,
        });

        await this.createProposalNotification(
          req,
          status,
          user.fullName,
          applicantId,
          projectId,
          proposalId,
          dbTransaction,
        );

        const remainingProposal = await this.proposalModel.findAll({
          where: {
            projectId,
            status: 'Pending',
            id: {
              [Op.ne]: proposalId,
            },
          },
          logging: this.log.logSqlQuery(req.context),
          transaction: dbTransaction,
        });

        // Reject remaining proposal
        remainingProposal.forEach(async (proposal) => {
          await this.proposalModel.update(
            { status: 'Rejected', updatedBy: `${user.id}` },
            {
              where: {
                id: proposal.id,
                projectId,
              },
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );

          await this.createProposalNotification(
            req,
            'Rejected',
            user.fullName,
            proposal.freelancerId,
            projectId,
            proposal.id,
            dbTransaction,
          );
        });
      } else {
        await this.proposalModel.update(
          { status, updatedBy: `${user.id}` },
          {
            where: {
              id: proposalId,
              projectId,
            },
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
        );

        await this.createProposalNotification(
          req,
          status,
          user.fullName,
          applicantId,
          projectId,
          proposalId,
          dbTransaction,
        );
      }

      await dbTransaction.commit({
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, `Proposal ${status}`, null);
    } catch (error) {
      if (dbTransaction) {
        await dbTransaction.rollback({
          logging: this.log.logSqlQuery(req.context),
        });
      }
      next(error);
    }
  };

  createProposalNotification = async (
    req,
    status,
    mentorName,
    applicantId,
    projectId,
    proposalId,
    transaction = null,
  ) => {
    await this.notificationModel.create(
      {
        userId: applicantId,
        title:
          status === 'Accepted'
            ? 'Selamat! Proposal anda lolos'
            : 'Mohon maaf!, proposal anda telah ditolak!',
        message:
          status === 'Accepted'
            ? `${mentorName} sudah mereview proposal Anda dan tertarik untuk bekerja sama dengan Anda!`
            : `${mentorName} sudah mereview proposal Anda dan memutuskan untuk tidak bekerja sama dengan Anda.`,
        source: `PATCH - v1/project/${projectId}/proposal/${proposalId}`,
        createdBy: `${user.id}`,
        updatedBy: `${user.id}`,
      },
      {
        logging: this.log.logSqlQuery(req.context),
        transaction,
      },
    );
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
};
