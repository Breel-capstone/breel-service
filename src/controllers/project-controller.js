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

      if (!user || user.roleId < 2) {
        throw new ErrorLib('Only client and mentor can create project', 403);
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
          mentorId: user.roleId === 2 ? user.id : null,
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
    /*
    projectId = id project
    proposalId = id proposal untuk project diatas
    applicantId = id pemilik proposal, diperlukan sebagai double check
    uid = id milik user (bisa mentor atau client)
    */
    const { projectId, proposalId } = req.params;
    const { status, applicantId } = req.body;
    const { uid } = req.user;

    //input sanitization
    if (!['Accepted', 'Rejected'].includes(status)) {
      throw new ErrorLib('Status must be either Accepted or Rejected', 400);
    }

    //init transaction var, semua modifikasi db akan dimasukkan kedalam satu transaksi
    let dbTransaction;

    try {
      // get user yang merequest ini
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId', 'fullName'],
        logging: this.log.logSqlQuery(req.context),
      });

      //init identifikasi project yang mau diubah
      const projectCondition = {
        id: projectId,
      };

      /*
      memastikan yang request akan mendapatkan
      resource miliknya, tergantung role nya.
      kecuali role freelancer junior
      (nyoba pake rejectOnEmpty dari sequelize sendiri)
      (klo kurang setuju report yak)
      */


      // get project yang direquest
      const project = await this.projectModel.findOne({
        where: projectCondition,
        logging: this.log.logSqlQuery(req.context),
      });

      if (!project) {
        throw new ErrorLib(
          'You do not have permission to update this proposal/project',
          403,
        );
      }

      if (project.status !== 'Menunggu Konfirmasi Freelancer') {
        if (user) {
          switch (user.roleId) {
            case 2:
              projectCondition.mentorId = user.id;
              break;
            case 3:
              projectCondition.clientId = user.id;
              break;
            default:
              throw new ErrorLib(
                'You do not have permission to update this proposal/project',
                403,
              );
          }
        } else {
          throw new ErrorLib(
            'You do not have permission to update this proposal/project',
            403,
          );
        }
      }

      // dbTransaction usage
      dbTransaction = await this.dbTransaction({
        logging: this.log.logSqlQuery(req.context),
      });

      // cek jika sudah diacc/reject sama client, menunggu acc freelancer/mentor
      if (project.status !== 'Menunggu Konfirmasi Freelancer') {
        //  diacc sama client
        if (status === 'Accepted') {
          // jika diacc client, update proposal
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

          // jika diacc client, update project
          await this.projectModel.update(
            {
              status: 'Menunggu Konfirmasi Freelancer',
              assigneId: applicantId,
              updatedBy: `${user.id}`,
              mentorId: applicantId,
            },
            {
              where: projectCondition,
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );

          // jika diacc client, kirim notif ke freelancer/mentor
          await this.notificationModel.create(
            await this.createProposalNotification(
              'Accepted',
              user.fullName,
              applicantId,
              projectId,
              proposalId,
              user,
            ),
            {
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );

          // jika diacc client, reject proposal yang lain
          // ambil semua proposal untuk project yang direquest
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

          // extract semua id dalam masing masing proposal kedalam proposalId
          const proposalIds = remainingProposal.map((proposal) => proposal.id);

          // reject semua proposal dalam proposalIds
          await this.proposalModel.update(
            { status: 'Rejected', updatedBy: `${user.id}` },
            {
              where: { id: { [Op.in]: proposalIds } },
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );

          // kirim notif untuk masing-masing pemilik proposal yang di reject
          await this.notificationModel.bulkCreate(
            proposalIds.map((proposalId) =>
              this.createProposalNotification(
                'Rejected',
                user.fullName,
                proposalId.freelancerId,
                projectId,
                proposalId,
                user,
              ),
            ),
            {
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );

          // di reject sama client
        } else {
          // jika di reject client, update proposal menjadi "Rejected"
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

          // jika di reject client, kirim notif Rejected ke mentor/freelancer
          await this.notificationModel.create(
            await this.createProposalNotification(
              'Rejected',
              user.fullName,
              applicantId,
              projectId,
              proposalId,
              user,
            ),
            {
              logging: this.log.logSqlQuery(req.context),
              transaction: dbTransaction,
            },
          );
        }

        // jika sudah diacc client, menunggu acc dari mentor/freelancer
      } else {
        // ketika project dalam status "Menunggu Konfirmasi Freelancer"
        // pastiin yang request sekarang adalah mentor, bukan client
        if (user.roleId < 2) {
          // di acc sama mentor/freelancer
          if (status === 'Accepted') {
            // jika di acc sama mentor/freelancer, update status menjadi "Sedang Berjalan"
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

            // jika di acc sama mentor/freelancer, kirim notif ke client
            await this.notificationModel.create(
              await this.createProjectNotification(
                'Accepted',
                user.fullName,
                project.clientId,
                projectId,
                proposalId,
                user,
              ),
              {
                logging: this.log.logSqlQuery(req.context),
                transaction: dbTransaction,
              },
            );
            // di reject sama mentor/freelancer
          } else {
            // jika di reject sama mentor/freelancer, update status menjadi "Mencari"
            await this.projectModel.update(
              {
                status: 'Mencari',
                assigneId: applicantId,
                updatedBy: `${user.id}`,
              },
              {
                where: projectCondition,
                logging: this.log.logSqlQuery(req.context),
                transaction: dbTransaction,
              },
            );

            // jika di acc sama mentor/freelancer, kirim notif ke client
            await this.notificationModel.create(
              await this.createProjectNotification(
                'Rejected',
                user.fullName,
                project.clientId,
                projectId,
                proposalId,
                user,
              ),
              {
                logging: this.log.logSqlQuery(req.context),
                transaction: dbTransaction,
              },
            );

            // tambahin fitur semua yang tadi di reject menjadi pending?
          }
          // jika yang request client, dan status project adalah "Menunggu Konfirmasi Freelancer"
        } else {
          throw new ErrorLib(
            'You do not have permission to update this project now',
            403,
          );
        }
      }

      // laksanakan semua aksi modifikasi DB menjadi satu transaksi
      await dbTransaction.commit({
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, `Proposal ${status}`, null);
    } catch (error) {
      // jika terjadi kesalahan, revert satu transaksi tersebut
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
    user,
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

  createProjectNotification = async (
    status,
    mentorName,
    clientId,
    projectId,
    proposalId,
    user,
  ) => ({
    userId: clientId,
    title:
      status === 'Accepted'
        ? `${mentorName} bersedia untuk bekerja sama!`
        : `${mentorName} tidak bersedia untuk bekerja sama!`,
    message:
      status === 'Accepted'
        ? `${mentorName} bersedia untuk bekerja sama dengan anda untuk menyelesaikan project!`
        : `${mentorName} tidak memutuskan untuk melanjutkan perjanjian kerjasama project anda!`,
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
      if (user.roleId < 2) {
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
    const { id } = req.params;

    try {
      const projectDetail = await this.projectModel.findOne({
        where: { id },
        logging: this.log.logSqlQuery(req.context),
      });

      projectDetail.skills = [...new Set(projectDetail.skills.split(','))];

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
        const skills = freelancer.userSkills.map((skill) => skill.skillName);
        return {
          id: proposal.id,
          applicantId: freelancer.id,
          applicantUid: freelancer.uid,
          applicantName: freelancer.fullName,
          applicantProfileUrl: freelancer.profileUrl,
          applicantSkills: [...new Set(skills)],
          status: proposal.status,
        };
      });

      this.helper.httpRespSuccess(req, res, 200, response);
    } catch (error) {
      next(error);
    }
  };

  getProjectMentorshipList = async (req, res) => {
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });

      if (!user || user.roleId !== 2) {
        throw new ErrorLib("You don't have permission to access this API");
      }

      const project = await this.projectModel.findAll({
        where: { mentorId: user.id, status: { [Op.ne]: 'Selesai' } },
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, project);
    } catch (error) {
      next(error);
    }
  };
};
