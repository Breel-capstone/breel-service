const ErrorLib = require('../../sdk/errorlib');

module.exports = class MentorController {
  constructor(log, helper, mentorModel, userModel) {
    this.log = log;
    this.helper = helper;
    this.userModel = userModel;
    this.mentorModel = mentorModel;
  }

  createMentor = async (req, res, next) => {
    const { uid } = req.user;
    const { price, durationMonth } = req.body;

    try {
      const user = await this.userModel.findOne({
        where: { uid },
        attributes: ['id'],
        logging: this.log.logSqlQuery(req.context),
      });

      // TODO: only user with role senior freelancer can create mentor

      await this.mentorModel.create(
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
    try {
      let mentorList;
      mentorList = await this.mentorModel.findAll();

      // User registered in firebase but not in database, ignore
      if (!mentorList) {
        throw new ErrorLib('No Mentors existed', 404);
      }

      this.helper.httpRespSuccess(req, res, 200, mentorList, null);
    } catch (error) {
      next(error);
    }
  };
};