const userRouter = require('express').Router();

module.exports = class UserRoute {
  constructor(config, log, userController, middleware) {
    this.config = config;
    this.log = log;
    this.userController = userController;
    this.authMiddleware = middleware.auth;
    this.paginationMiddleware = middleware.paginate;
  }

  /**
   * @swagger
   *components:
   *  schemas:
   *    UserExperience:
   *      type: object
   *      properties:
   *        companyName:
   *          type: string
   *        location:
   *          type: string
   *        title:
   *          type: string
   *        startDate:
   *          type: string
   *          format: date
   *          example: 2020-01-01
   *        endDate:
   *          type: string
   *          format: date
   *          example: 2020-01-01
   *          nullable: true
   *        description:
   *          type: string
   *          nullable: true
   *    UserSkill:
   *      type: object
   *      properties:
   *        skillName:
   *          type: string
   *    UserProject:
   *      type: object
   *      properties:
   *        title:
   *          type: string
   *        thumbnailUrl:
   *          type: string
   *          nullable: true
   *        description:
   *          type: string
   *          nullable: true
   *    User:
   *      type: object
   *      properties:
   *        id:
   *          type: integer
   *        uid:
   *          type: string
   *        email:
   *          type: string
   *        roleId:
   *          type: integer
   *        fullName:
   *          type: string
   *        title:
   *          type: string
   *          nullable: true
   *        description:
   *          type: string
   *          nullable: true
   *        profileUrl:
   *          type: string
   *          nullable: true
   */

  getRoutes = () => {
    userRouter.use(this.authMiddleware.verifyToken);
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
      .get('/profile', this.userController.profile)
      /**
       * @swagger
       * /v1/user/register-detail:
       *   post:
       *     summary: Register user detail
       *     tags: [User]
       *     security:
       *       - bearerAuth: []
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               user:
       *                 type: object
       *                 properties:
       *                   fullName:
       *                     type: string
       *                   title:
       *                     type: string
       *                   description:
       *                     type: string
       *                   profileUrl:
       *                     type: string
       *               userExperiences:
       *                 type: array
       *                 items:
       *                   type: object
       *                   $ref: '#/components/schemas/UserExperience'
       *               userSkills:
       *                 type: array
       *                 items:
       *                   type: object
       *                   $ref: '#/components/schemas/UserSkill'
       *               userProjects:
       *                 type: array
       *                 items:
       *                   type: object
       *                   $ref: '#/components/schemas/UserProject'
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Registered user detail successfully
       *
       */
      .post('/register-detail', this.userController.registerDetail)

      /**
       * @swagger
       * /v1/user/mentors:
       *   get:
       *     summary: Get user mentors
       *     tags: [User]
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - $ref: '#/components/parameters/PageQuery'
       *       - $ref: '#/components/parameters/LimitQuery'
       *       - $ref: '#/components/parameters/DisableLimitQuery'
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 data:
       *                   type: array
       *                   items:
       *                     type: object
       *                     properties:
       *                       id:
       *                         type: integer
       *                       fullName:
       *                         type: string
       *                       price:
       *                         type: integer
       *                       priceString:
       *                         type: string
       *                       profileUrl:
       *                         type: string
       *                       skills:
       *                        type: array
       *                        items:
       *                          type: string
       *                 pagination:
       *                   $ref: '#/components/schemas/Pagination'
       */
      .get(
        '/mentors',
        this.paginationMiddleware,
        this.userController.getUserMentor,
      )
      /**
       * @swagger
       * /v1/user/profile/{userId}:
       *   get:
       *     summary: Get profile by UID
       *     tags: [User]
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: id   # Note the name is the same as in the path
       *         required: true
       *         schema:
       *           type: integer
       *           minimum: 1
       *         description: The user ID
       *       - $ref: '#/components/parameters/PageQuery'
       *       - $ref: '#/components/parameters/LimitQuery'
       *       - $ref: '#/components/parameters/DisableLimitQuery'
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 data:
       *                   type: array
       *                   items:
       *                     type: object
       *                     properties:
       *                       id:
       *                         type: integer
       *                       fullName:
       *                         type: string
       *                       price:
       *                         type: integer
       *                       priceString:
       *                         type: string
       *                       profileUrl:
       *                         type: string
       *                       skills:
       *                        type: array
       *                        items:
       *                          type: string
       *                 pagination:
       *                   $ref: '#/components/schemas/Pagination'
       */
      .get(
        '/profile/:userId',
        this.paginationMiddleware,
        this.userController.profileById,
      );

    return userRouter;
  };
};
