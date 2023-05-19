const projectRouter = require('express').Router();

module.exports = class ProjectRoute {
  constructor(log, projectController, middleware) {
    this.log = log;
    this.projectController = projectController;
    this.authMiddleware = middleware.auth;
  }

  getRoutes = () => {
    projectRouter.use(this.authMiddleware.verifyToken);
    projectRouter
      /**
       * @swagger
       * /v1/project/{projectId}/proposal:
       *   post:
       *     tags: [Project]
       *     summary: Create project proposal
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: projectId
       *         required: true
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
       *               coverLetter:
       *                 type: string
       *     responses:
       *       201:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Proposal created
       */
      .post(
        '/:projectId/proposal',
        this.projectController.createProjectProposal,
      );

    return projectRouter;
  };
};
