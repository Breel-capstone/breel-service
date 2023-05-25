const mentorRouter = require('express').Router();

module.exports = class MentorRoute {
  constructor(config, log, mentorController, middleware) {
    this.config = config;
    this.log = log;
    this.mentorController = mentorController;
    this.authMiddleware = middleware.auth;
    this.paginationMiddleware = middleware.paginate;
  }
  /**
   * @swagger
   *components:
   *  schemas:
   *    Mentor:
   *      type: object
   *      properties:
   *        id:
   *          type: integer
   *        userId:
   *          type: string
   *        price:
   *          type: integer
   *        durationMonth:
   *          type: integer
   */

  getRoutes = () => {
    mentorRouter.use(this.authMiddleware.verifyToken);
    mentorRouter
      /**
       * @swagger
       * /v1/mentor:
       *   post:
       *     tags: [Mentor]
       *     summary: Create daily mentor
       *     security:
       *       - bearerAuth: []
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               price:
       *                 type: integer
       *               durationMonth:
       *                 type: integer
       *     responses:
       *       201:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Mentor created
       */
      .post('/', this.mentorController.createMentor)
      /**
       * @swagger
       * /v1/mentor:
       *   get:
       *     tags: [Mentor]
       *     summary: Get Daily Mentor list
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - $ref: '#/components/parameters/PageQuery'
       *       - $ref: '#/components/parameters/LimitQuery'
       *       - $ref: '#/components/parameters/DisableLimitQuery'
       *       - in: query
       *         name: keyword
       *         type: string
       *         description: Mentor search keyword
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
       *                     allOf:
       *                       - $ref: '#/components/schemas/User'
       *                       - $ref: '#/components/schemas/UtilityField'
       *                     properties:
       *                       price:
       *                         type: integer
       *                       skills:
       *                         type: array
       *                         items:
       *                           type: string
       *                 pagination:
       *                   type: object
       *                   $ref: '#/components/schemas/Pagination'
       */
      .get('/', this.paginationMiddleware, this.mentorController.getMentors);

    return mentorRouter;
  };
};
