const mentorRouter = require('express').Router();


module.exports = class MentorRoute {
  constructor(config, log, mentorController, middleware) {
    this.config = config;
    this.log = log;
    this.mentorController = mentorController;
    this.authMiddleware = middleware.auth;
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
       *     summary: Create mentor
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
       *     summary: list all mentors
       *     security:
       *       - bearerAuth: []
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *              type: object
       *              $ref: '#/components/schemas/Mentor'
       */
      .get('/', this.mentorController.getMentors);

    return mentorRouter;
  };
};
