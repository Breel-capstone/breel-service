const httpClient = require('axios');

const ErrorLib = require('../../sdk/errorlib');

module.exports = class UserController {
  constructor(
    log,
    config,
    helper,
    authLib,
    userModel,
    userExperienceModel,
    userProjectExperienceModel,
    userSkillModel,
    userFeedbackModel,
    dailyMentoringApplicantModel,
    dailyMentoringModel,
    dbTransaction,
  ) {
    this.log = log;
    this.config = config;
    this.helper = helper;
    this.authLib = authLib;
    this.userModel = userModel;
    this.userExperienceModel = userExperienceModel;
    this.userProjectExperienceModel = userProjectExperienceModel;
    this.userSkillModel = userSkillModel;
    this.userFeedbackModel = userFeedbackModel;
    this.dailyMentoringApplicantModel = dailyMentoringApplicantModel;
    this.dailyMentoringModel = dailyMentoringModel;
    this.dbTransaction = dbTransaction;
  }

  register = async (req, res, next) => {
    try {
      const { email: userEmail, password, roleId } = req.body;

      const authAPILink = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.config.Firebase.WebAPIKey}`;
      const authAPIResp = await httpClient.post(authAPILink, {
        email: userEmail,
        password,
        returnSecureToken: true,
      });

      if (authAPIResp.status !== 200) {
        this.log.error(req.context, authAPIResp.data);
        throw new ErrorLib('Failed to register user', 500);
      }

      const { idToken, email, localId } = authAPIResp.data;

      const newUser = await this.userModel.create({
        logging: this.log.logSqlQuery(req.context),
        uid: localId,
        email,
        fullName: '',
        roleId: roleId || 1,
      });

      const resp = {
        idToken,
        user: newUser,
      };

      this.helper.httpRespSuccess(req, res, 201, resp, null);
    } catch (error) {
      if (error.response) {
        next(
          new ErrorLib(
            error.response.data.error.message,
            error.response.status,
          ),
        );
      } else {
        next(error);
      }
    }
  };

  profile = async (req, res, next) => {
    try {
      const { user } = req;

      let userInfo;

      userInfo = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        where: { uid: user.uid },
      });

      // User registered in firebase but not in database
      if (!userInfo) {
        await this.userModel.create({
          logging: this.log.logSqlQuery(req.context),
          uid: user.uid,
          email: user.email,
          fullName: user.name || '',
          roleId: 1, // TODO: remove this hardcoded roleId
        });

        userInfo = await this.userModel.findOne({
          logging: this.log.logSqlQuery(req.context),
          where: { uid: user.uid },
        });
      }

      this.helper.httpRespSuccess(req, res, 200, userInfo, null);
    } catch (error) {
      next(error);
    }
  };

  profileById = async (req, res, next) => {
    const userRelations = [
      {
        model: this.userSkillModel,
        as: 'userSkills',
        attributes: ['skillName'],
      },
      {
        model: this.userProjectExperienceModel,
        as: 'userProjectExperiences',
        attributes: ['title', 'thumbnailUrl', 'description'],
      },
      {
        model: this.userExperienceModel,
        as: 'userExperiences',
        attributes: [
          'companyName',
          'location',
          'title',
          'startDate',
          'endDate',
          'description',
        ],
      },
      {
        model: this.dailyMentoringModel,
        as: 'dailyMentoring',
        attributes: ['price', 'durationMonth'],
      },
    ];

    try {
      let userInfo;
      userInfo = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        include: userRelations,
        where: { uid: req.params.userId },
      });

      // User registered in firebase but not in database, ignore
      if (!userInfo) {
        throw new ErrorLib(`user with id ${req.param.userId} not found`, 404);
      }

      const response = {
        ...userInfo.dataValues,
        userSkills: [
          ...new Set(userInfo.userSkills.map((skill) => skill.skillName)),
        ].map((skillName) => ({ skillName })),
      };

      this.helper.httpRespSuccess(req, res, 200, response, null);
    } catch (error) {
      next(error);
    }
  };

  registerDetail = async (req, res, next) => {
    let dbTransaction;
    try {
      const { user, userSkills, userExperiences, userProjectExperiences } =
        req.body;
      const { user: currentUser } = req;

      const userInfo = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        where: { uid: currentUser.uid },
      });

      dbTransaction = await this.dbTransaction({
        logging: this.log.logSqlQuery(req.context),
      });

      await this.userModel.update(
        {
          fullName: user.fullName,
          title: user.title,
          description: user.description,
          profileUrl: user.profileUrl,
        },
        {
          where: { id: userInfo.id },
          transaction: dbTransaction,
          logging: this.log.logSqlQuery(req.context),
        },
      );

      await this.userExperienceModel.bulkCreate(
        userExperiences.map((userExperience) => ({
          ...userExperience,
          userId: userInfo.id,
        })),
        {
          logging: this.log.logSqlQuery(req.context),
          transaction: dbTransaction,
        },
      );

      await this.userProjectExperienceModel.bulkCreate(
        userProjectExperiences.map((userProjectExperience) => ({
          ...userProjectExperience,
          userId: userInfo.id,
        })),
        {
          logging: this.log.logSqlQuery(req.context),
          transaction: dbTransaction,
        },
      );

      await this.userSkillModel.bulkCreate(
        userSkills.map((userSkill) => ({
          ...userSkill,
          userId: userInfo.id,
        })),
        {
          logging: this.log.logSqlQuery(req.context),
          transaction: dbTransaction,
        },
      );

      await dbTransaction.commit({
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(
        req,
        res,
        200,
        'Register user detail successfull!',
        null,
      );
    } catch (error) {
      if (dbTransaction) {
        await dbTransaction.rollback({
          logging: this.log.logSqlQuery(req.context),
        });
      }
      next(error);
    }
  };

  getUserFeedback = async (req, res, next) => {
    const { uid } = req.user;

    try {
      const user = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        where: { uid },
        attributes: ['id', 'roleId'],
      });

      if (user.roleId === 3) {
        throw new ErrorLib(
          'You do not have permission to access this API',
          403,
        );
      }

      const userFeedbackList = await this.userFeedbackModel.findAll({
        where: {
          freelancerId: user.id,
          date: new Date().toLocaleDateString('en-US'),
        },
        logging: this.log.logSqlQuery(req.context),
      });

      this.helper.httpRespSuccess(req, res, 200, userFeedbackList, null);
    } catch (error) {
      next(error);
    }
  };
};
