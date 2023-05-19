const mentorRouter = require('express').Router();

module.exports = class MentorRoute {
  constructor(config, log, mentorController, middleware) {
    this.config = config;
    this.log = log;
    this.mentorController = mentorController;
    this.authMiddleware = middleware.auth;
  }

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
      .post('/', this.mentorController.createMentor);

    return mentorRouter;
  };
};
