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
    userProjectModel,
    userSkillModel,
    dbTransaction,
  ) {
    this.log = log;
    this.config = config;
    this.helper = helper;
    this.authLib = authLib;
    this.userModel = userModel;
    this.userExperienceModel = userExperienceModel;
    this.userProjectModel = userProjectModel;
    this.userSkillModel = userSkillModel;
    this.dbTransaction = dbTransaction;
  }

  register = async (req, res, next) => {
    try {
      const { email: userEmail, password } = req.body;

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
        roleId: 1, // TODO: remove this hardcoded roleId
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
    try {
      let userInfo;
      userInfo = await this.userModel.findOne({
        logging: this.log.logSqlQuery(req.context),
        where: { uid: req.params.userId },
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

  registerDetail = async (req, res, next) => {
    let dbTransaction;
    try {
      const { user, userSkills, userExperiences, userProjects } = req.body;
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

      await this.userProjectModel.bulkCreate(
        userProjects.map((userProject) => ({
          ...userProject,
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
        await dbTransaction.rollback();
      }
      next(error);
    }
  };

  getUserMentor = async (req, res, next) => {
    const dummyDatas = [
      {
        id: 1,
        fullName: 'Anjani P.',
        price: 500_000,
        priceString: '500.000',
        profileUrl: 'https://picsum.photos/200',
        skills: ['UI/UX', 'Figma'],
      },
    ];

    for (let i = 1; i < 10; i++) {
      dummyDatas.push({
        id: i + 1,
        fullName: dummyDatas[0].fullName,
        price: dummyDatas[0].price,
        priceString: dummyDatas[0].priceString,
        profileUrl: dummyDatas[0].profileUrl,
        skills: dummyDatas[0].skills,
      });
    }

    const paginationResponse = this.helper.processPagination(
      req.paginationQuery,
      dummyDatas.length,
      dummyDatas.length,
    );

    this.helper.httpRespSuccess(req, res, 200, dummyDatas, paginationResponse);
  };
};
