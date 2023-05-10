const userRouter = require('express').Router();

module.exports = class UserRoute {
  constructor(config, log, userController, authMiddleware) {
    this.config = config;
    this.log = log;
    this.userController = userController;
    this.authMiddleware = authMiddleware;
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         uid:
   *           type: string
   *         email:
   *           type: string
   *         roleId:
   *           type: integer
   *         fullName:
   *           type: string
   *         title:
   *           type: string
   *           nullable: true
   *         description:
   *           type: string
   *           nullable: true
   *         profileUrl:
   *           type: string
   *           nullable: true
   */

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
       *          content:
       *            application/json:
       *              schema:
       *                type: object
       *                allOf:
       *                  - $ref: '#/components/schemas/User'
       *                  - $ref: '#/components/schemas/UtilityField'
       *            
       */
      .get(
        '/profile',
        this.authMiddleware.verifyToken,
        this.userController.profile,
      );

    return userRouter;
  };
};
