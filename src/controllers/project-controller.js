const ErrorLib = require('../../sdk/errorlib');
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
    userSkillModel,
  ) {
    this.log = log;
    this.helper = helper;
    this.proposalModel = proposalModel;
    this.userModel = userModel;
    this.projectModel = projectModel;
    this.projectMentorshipModel = projectMentorshipModel;
    this.notificationModel = notificationModel;
    this.dbTransaction = dbTransaction;
    this.userSkillModel = userSkillModel;
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
    const { title, description, durationMonth, budget, skills } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });

      if (!user || user.roleId !== 3) {
        throw new ErrorLib('Only client can create project', 403);
      }

      await this.projectModel.create(
        {
          clientId: user.id,
          title,
          description,
          durationMonth,
          budget,
          budgetString: budget.toLocaleString('id-ID'),
          skills: skills.join(','),
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
      throw new ErrorLib('Status must be either Accepted or Rejected', 400);
    }

    let dbTransaction;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'role_id', 'full_name'],
        logging: this.log.logSqlQuery(req.context),
      });

      if (!user || user.roleId === 1) {
        throw new ErrorLib(
          'You do not have permission to update this proposal',
          403,
        );
      }

      const projectCondition = {
        id: projectId,
      };

      if (user.roleId === 2) {
        projectCondition.mentorId = user.id;
      } else {
        projectCondition.clientId = user.id;
      }

      const project = await this.projectModel.findOne({
        where: projectCondition,
        logging: this.log.logSqlQuery(req.context),
      });

      if (!project) {
        throw new ErrorLib(
          'You do not have permission to update this proposal',
          403,
        );
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

        await this.projectModel.update(
          {
            status: 'Sedang Berjalan',
            assigneId: applicantId,
            updatedBy: `${user.id}`,
          },
          {
            where: projectCondition,
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
        );

        await this.notificationModel.create(
          this.createProposalNotification(
            'Accepted',
            user.fullName,
            applicantId,
            projectId,
            proposalId,
          ),
          {
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
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

        const proposalIds = remainingProposal.map((proposal) => proposal.id);

        await this.proposalModel.update(
          { status: 'Rejected', updatedBy: `${user.id}` },
          {
            where: { id: { [Op.in]: proposalIds } },
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
        );

        await this.notificationModel.bulkCreate(
          proposalIds.map((proposalId) =>
            this.createProposalNotification(
              'Rejected',
              user.fullName,
              applicantId,
              projectId,
              proposalId,
            ),
          ),
          {
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
        );
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

        await this.notificationModel.create(
          this.createProposalNotification(
            'Rejected',
            user.fullName,
            applicantId,
            projectId,
            proposalId,
          ),
          {
            logging: this.log.logSqlQuery(req.context),
            transaction: dbTransaction,
          },
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
    status,
    mentorName,
    applicantId,
    projectId,
    proposalId,
  ) => ({
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
  });

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

  getProjectList = async (req, res, next) => {
    const { status, isMentored, keyword } = req.query;

    let mentorId = null;
    if (isMentored === 'true') {
      mentorId = {
        [Op.ne]: null,
      };
    }

    const getQuery = {
      ...req.paginationQuery,
      where: {
        status,
        mentorId,
      },
    };

    if (!status) {
      delete getQuery.where.status;
    }

    if (keyword) {
      getQuery.where = {
        ...getQuery.where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      };
    }

    try {
      const projectList = await this.projectModel.findAll({
        ...req.paginationQuery,
        ...getQuery,
        logging: this.log.logSqlQuery(req.context),
      });

      const projectListCount = await this.projectModel.count({
        ...getQuery,
        logging: this.log.logSqlQuery(req.context),
      });

      projectList.forEach((project) => {
        if (project.skills === null) {
          project.skills = [];
        } else {
          project.skills = project.skills.split(',');
        }
      });

      this.helper.httpRespSuccess(
        req,
        res,
        200,
        projectList,
        this.helper.processPagination(
          req.paginationQuery,
          projectList.length,
          projectListCount,
        ),
      );
    } catch (error) {
      next(error);
    }
  };

  getProjectById = async (req, res, next) => {
    const { id } = req.query;

    try {
      const projectDetail = await this.projectModel.findOne({
        where: id,
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, projectDetail);
    } catch (error) {
      next(error);
    }
  };

  getProjectProposal = async (req, res, next) => {
    const { projectId } = req.params;
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });

      console.log(user);

      if (!user || user.roleId === 1) {
        throw new ErrorLib(
          'You are not authorized to access this resource',
          403,
        );
      }

      const projectCond = {
        id: projectId,
      };
      if (user.roleId === 2) {
        projectCond.mentorId = user.id;
      } else {
        projectCond.clientId = user.id;
      }

      const project = await this.projectModel.findOne({
        where: projectCond,

        logging: this.log.logSqlQuery(req.context),
      });

      if (!project) {
        throw new ErrorLib('Project not found', 404);
      }

      const projectProposals = await this.proposalModel.findAll({
        where: {
          projectId,
        },
        include: [
          {
            model: this.userModel,
            as: 'freelancer',
            attributes: ['id', 'uid', 'fullName', 'profileUrl'],
            include: [
              {
                model: this.userSkillModel,
                as: 'userSkills',
                attributes: ['skillName'],
              },
            ],
          },
        ],
        logging: this.log.logSqlQuery(req.context),
      });

      const response = projectProposals.map((proposal) => {
        const { freelancer } = proposal;
        const skills = freelancer.userSkills.map((skill) => skill.name);
        return {
          id: proposal.id,
          applicantId: freelancer.id,
          applicantUid: freelancer.uid,
          applicantName: freelancer.fullName,
          applicantProfileUrl: freelancer.profileUrl,
          applicantSkills: skills,
          status: proposal.status,
        };
      });

      this.helper.httpRespSuccess(req, res, 200, response);
    } catch (error) {
      next(error);
    }
  };
};
