const ErrorLib = require('../../sdk/errorlib');
const { Op } = require('sequelize');

module.exports = class MentorController {
  constructor(
    log,
    helper,
    dailyMentoringModel,
    userModel,
    userSkillModel,
    dailyMentoringApplicantModel,
    notificationModel,
  ) {
    this.log = log;
    this.helper = helper;
    this.userModel = userModel;
    this.dailyMentoringModel = dailyMentoringModel;
    this.userSkillModel = userSkillModel;
    this.dailyMentoringApplicantModel = dailyMentoringApplicantModel;
    this.notificationModel = notificationModel;
  }

  createMentor = async (req, res, next) => {
    const { uid } = req.user;
    const { price, durationMonth } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId'],
        logging: this.log.logSqlQuery(req.context),
      });

      if (user.roleId !== 2) {
        throw new ErrorLib('Only senior freelancer can create mentor', 403);
      }

      await this.dailyMentoringModel.create(
        {
          freelancerId: user.id,
          price,
          durationMonth,
          createdBy: `${user.id}`,
          updatedBy: `${user.id}`,
        },
        {
          logging: this.log.logSqlQuery(req.context),
        },
      );

      this.helper.httpRespSuccess(req, res, 201, 'Mentor created', null);
    } catch (error) {
      next(error);
    }
  };

  getMentors = async (req, res, next) => {
    const { keyword } = req.query;
    let whereClause = {
      roleId: 2,
    };

    if (keyword) {
      whereClause = {
        roleId: 2,
        fullName: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }

    const dailyMentoringRelation = {
      model: this.dailyMentoringModel,
      as: 'dailyMentoring',
      attributes: ['price'],
      required: true,
    };

    const mentorSkillRelation = {
      model: this.userSkillModel,
      as: 'userSkills',
      attributes: ['skillName'],
    };

    try {
      const mentorList = await this.userModel.findAll({
        ...req.paginationQuery,
        where: whereClause,
        include: [dailyMentoringRelation, mentorSkillRelation],
        logging: this.log.logSqlQuery(req.context),
      });

      const mentorListCount = await this.userModel.count({
        where: whereClause,
        include: [dailyMentoringRelation, mentorSkillRelation],
        logging: this.log.logSqlQuery(req.context),
      });

      const mentorListData = mentorList.map((mentor) => ({
        ...mentor.dataValues,
        price: mentor.dailyMentoring.price,
        priceString: mentor.dailyMentoring.price.toLocaleString('id-ID'),
        skills: this.mapUserSkills(mentor.userSkills),
        dailyMentoring: undefined,
        userSkills: undefined,
      }));

      this.helper.httpRespSuccess(
        req,
        res,
        200,
        mentorListData,
        this.helper.processPagination(
          req.paginationQuery,
          mentorList.length,
          mentorListCount,
        ),
      );
    } catch (error) {
      next(error);
    }
  };

  getMentoringApplicants = async (req, res, next) => {
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id'],
        include: [
          {
            model: this.dailyMentoringModel,
            as: 'dailyMentoring',
            required: true,
            attributes: ['id'],
          },
        ],
        logging: this.log.logSqlQuery(req.context),
      });

      if (!user) {
        throw new ErrorLib('You are not a mentor', 403);
      }

      const dailyMentoringId = user.dailyMentoring.id;

      const dmApplicantList = await this.dailyMentoringApplicantModel.findAll({
        where: {
          dailyMentoringId,
          status: { [Op.in]: ['Approved', 'Pending'] },
        },
        include: [
          {
            model: this.userModel,
            as: 'applicant',
            required: true,
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

      const acceptedApplicants = [];
      const pendingApplicants = [];

      dmApplicantList.forEach((dmApplicant) => {
        if (dmApplicant.status === 'Approved') {
          acceptedApplicants.push({
            ...dmApplicant.applicant.dataValues,
            skills: this.mapUserSkills(dmApplicant.applicant.userSkills)
          });
        } else if (dmApplicant.status === 'Pending') {
          pendingApplicants.push({
            ...dmApplicant.applicant.dataValues,
            skills: this.mapUserSkills(dmApplicant.applicant.userSkills)
          });
        }
      });

      const data = {
        acceptedApplicants,
        pendingApplicants,
      };

      this.helper.httpRespSuccess(req, res, 200, data, null);
    } catch (error) {
      next(error);
    }
  };

  acceptMentee = async (req, res, next) => {
    const { uid } = req.user;
    const { status } = req.body;
    const { applicantId } = req.params;

    const dailyMentoringRelation = {
      model: this.dailyMentoringModel,
      as: 'dailyMentoring',
      required: true,
    };

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'roleId', 'fullName'],
        include: [dailyMentoringRelation],
        logging: this.log.logSqlQuery(req.context),
      });

      if (user.roleId !== 2) {
        throw new ErrorLib('Only senior freelancer allowed', 403);
      }

      await this.dailyMentoringApplicantModel.update(
        { status, updatedBy: `${user.id}` },
        {
          where: {
            dailyMentoringId: user.dailyMentoring.id,
            applicantId,
          },
          logging: this.log.logSqlQuery(req.context),
        },
      );
      await this.createMentorNotification(
        req,
        status,
        user,
        user.fullName,
        applicantId,
      );

      this.helper.httpRespSuccess(req, res, 200, `Mentee ${status}`, null);
    } catch (error) {
      next(error);
    }
  };

  createMentorNotification = async (
    req,
    status,
    user,
    mentorName,
    applicantId,
  ) => {
    await this.notificationModel.create(
      {
        userId: applicantId,
        title:
          status === 'Approved'
            ? `Selamat! Anda diterima sebagai Mentee-nya ${mentorName}`
            : `Mohon maaf! Anda telah ditolak sebagai Mentee-nya ${mentorName}`,
        message:
          status === 'Approved'
            ? `Halo! ${mentorName} telah menerima anda sebagai Daily Mentee! Kontak Mentee anda untuk informasi selanjutnya`
            : `Halo! Setelah direview, ${mentorName} memutuskan untuk tidak memilih anda menjadi Daily Mentee, tetap semangat! masih banyak ikan di lautan!`,
        source: 'PATCH - v1/mentor/accept-applicant',
        createdBy: `${user.id}`,
        updatedBy: `${user.id}`,
      },
      {
        logging: this.log.logSqlQuery(req.context),
      },
    );
  };

  applyDailyMentoring = async (req, res, next) => {
    const { mentorId } = req.params;
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id'],
        logging: this.log.logSqlQuery(req.context),
      });

      const mentor = await this.userModel.findOne({
        where: { id: mentorId },
        attributes: ['id'],
        include: [
          {
            model: this.dailyMentoringModel,
            as: 'dailyMentoring',
            required: true,
            attributes: ['id'],
          },
        ],
        logging: this.log.logSqlQuery(req.context),
      });

      if (!mentor) {
        throw new ErrorLib('Mentor not found', 404);
      }

      if (user.id === mentor.id) {
        throw new ErrorLib('You cannot apply your own mentoring', 400);
      }

      const dmApplicant = await this.dailyMentoringApplicantModel.findOne({
        where: {
          dailyMentoringId: mentor.dailyMentoring.id,
          applicantId: user.id,
        },
        logging: this.log.logSqlQuery(req.context),
      });

      if (dmApplicant) {
        throw new ErrorLib('You have already applied this mentoring', 400);
      }

      await this.dailyMentoringApplicantModel.create(
        {
          dailyMentoringId: mentor.dailyMentoring.id,
          applicantId: user.id,
          status: 'Pending',
          createdBy: `${user.id}`,
          updatedBy: `${user.id}`,
        },
        {
          logging: this.log.logSqlQuery(req.context),
        },
      );

      this.helper.httpRespSuccess(req, res, 201, 'Successfully applied', null);
    } catch (error) {
      next(error);
    }
  };

  mapUserSkills = (userSkills) => {
    const newUserSkills = [...new Set(userSkills.map((skill) => skill.skillName))];
    return newUserSkills;
  };
};
