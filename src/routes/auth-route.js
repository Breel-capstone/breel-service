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
       *               roleId:
       *                 type: integer
       *     responses:
       *       201:
       *         description: user created
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 idToken:
       *                   type: string
       *                 user:
       *                   type: object
       *                   allOf:
       *                     - $ref: '#/components/schemas/User'
       *                     - $ref: '#/components/schemas/UtilityField'
       */
      .post('/register', this.authController.register);

    return authRouter;
  };
};
