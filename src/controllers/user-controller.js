module.exports = class UserController {
  constructor(log, helper, authLib) {
    this.log = log;
    this.helper = helper;
    this.authLib = authLib;
  }

  register = async (req, res, next) => {
    try {
      // TODO: validate request body
      console.log('test');

      this.helper.httpRespSuccess(req, res, 201, 'success', null);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { user } = req;

      this.helper.httpRespSuccess(req, res, 200, user, null);
    } catch (error) {
      next(error);
    }
  };
};
