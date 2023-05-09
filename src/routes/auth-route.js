const authRouter = require('express').Router();

module.exports = class AuthRoute {
  constructor(config, log, userController) {
    this.config = config;
    this.log = log;
    this.authController = userController;
  }

  getRoutes = () => {
    authRouter
      /**
       * @swagger
       * /v1/auth/register:
       *   post:
       *     summary: Register a new user
       *     tags: [Auth]
       *     responses:
       *       200:
       *         description: user created
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               email:
       *                 type: string
       *               password:
       *                 type: string
       */
      .post('/register', this.authController.register);

    return authRouter;
  };
};
