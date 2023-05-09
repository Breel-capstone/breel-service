const userRouter = require('express').Router();

module.exports = class UserRoute {
  constructor(config, log, userController, authMiddleware) {
    this.config = config;
    this.log = log;
    this.userController = userController;
    this.authMiddleware = authMiddleware;
  }

  getRoutes = () => {
    userRouter
      /**
       * @swagger
       * /v1/user/profile:
       *   get:
       *     summary: Get user profile
       *     tags: [User]
       *     security:
       *       - bearerAuth: []
       *     responses:
       *        200:
       *          description: user profile
       */
      .get(
        '/profile',
        this.authMiddleware.verifyToken,
        this.userController.profile,
      );

    return userRouter;
  };
};
