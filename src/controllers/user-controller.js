const httpClient = require('axios');

const ErrorLib = require('../../sdk/errorlib');

module.exports = class UserController {
  constructor(log, config, helper, authLib, userModel) {
    this.log = log;
    this.config = config;
    this.helper = helper;
    this.authLib = authLib;
    this.userModel = userModel;
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
};
