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
   *    UserProjectExperience:
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
       *               userProjectExperiences:
       *                 type: array
       *                 items:
       *                   type: object
       *                   $ref: '#/components/schemas/UserProjectExperience'
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
       * /v1/user/mentor:
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
        '/mentor',
        this.paginationMiddleware,
        this.userController.getUserMentor,
      )
      /**
       * @swagger
       * /v1/user/profile/{userId}:
       *   get:
       *     summary: Get profile by FireBase ID
       *     tags: [User]
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: userId  
       *         required: true 
       *         schema:
       *           type: string
       *         description: The user Firebase ID
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 message: 
       *                   type: object
       *                   properties: 
       *                     title: 
       *                       type: string
       *                     body: 
       *                       type: string
       *                     meta: 
       *                       type: object
       *                       properties: 
       *                         path: 
       *                           type: string
       *                         statusCode: 
       *                           type: integer
       *                           format: int32
       *                         timestamp: 
       *                           type: string
       *                           format: date-time
       *                         requestId: 
       *                           type: string
       *                         timeElapsed: 
       *                           type: string
       *                     data: 
       *                       type: object
       *                       properties: 
       *                         id: 
       *                           type: integer
       *                           format: int32
       *                         uid: 
       *                           type: string
       *                         email: 
       *                           type: string
       *                         roleId: 
       *                           type: integer
       *                           format: int32
       *                         fullName: 
       *                           type: string
       *                         title: 
       *                           type: string
       *                         description: 
       *                           type: string
       *                         profileUrl: 
       *                           type: string
       *                         createdBy: 
       *                           type: string
       *                           format: nullable
       *                         updatedBy: 
       *                           type: string
       *                           format: nullable
       *                         deletedBy: 
       *                           type: string
       *                           format: nullable
       *                         createdAt: 
       *                           type: string
       *                           format: date-time
       *                         updatedAt: 
       *                           type: string
       *                           format: date-time
       *                         deletedAt: 
       *                           type: string
       *                           format: nullable
       *                         userProjectExperiences: 
       *                           type: array
       *                           items: 
       *                             type: object
       *                             properties: 
       *                               title: 
       *                                 type: string
       *                               thumbnailUrl: 
       *                                 type: string
       *                               description: 
       *                                 type: string
       *                         userSkills: 
       *                           type: array
       *                           items: 
       *                             type: object
       *                             properties: 
       *                               skill_name: 
       *                                 type: string
       *                         userExperiences: 
       *                           type: array
       *                           items: 
       *                             type: object
       *                             properties: 
       *                               companyName: 
       *                                 type: string
       *                               location: 
       *                                 type: string
       *                               title: 
       *                                 type: string
       *                               startDate: 
       *                                 type: string
       *                                 format: date-time
       *                               endDate: 
       *                                 type: string
       *                                 format: date-time
       *                               description: 
       *                                 type: string
       * 
       */
      .get(
        '/profile/:userId',
        this.userController.profileById,
      );

    return userRouter;
  };
};
