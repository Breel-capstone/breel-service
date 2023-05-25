const ErrorLib = require('../../sdk/errorlib');
const { Op } = require('sequelize');

module.exports = class MentorController {
  constructor(log, helper, dailyMentoringModel, userModel, userSkillModel) {
    this.log = log;
    this.helper = helper;
    this.userModel = userModel;
    this.dailyMentoringModel = dailyMentoringModel;
    this.userSkillModel = userSkillModel;
  }

  createMentor = async (req, res, next) => {
    const { uid } = req.user;
    const { price, durationMonth } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id', 'role_id'],
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
      attributes: ['skill_name'],
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
        skills: mentor.userSkills.map((skill) => skill.skillName),
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
};
