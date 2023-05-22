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
      )

      /**
       * @swagger
       * /v1/project/:
       *   post:
       *     tags: [Project]
       *     summary: Create a new porject
       *     security:
       *       - bearerAuth: []
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *              title:
       *                type: string
       *              description:
       *                type: string
       *              durationMonth:
       *                type: integer
       *              budget:
       *                type: integer
       *     responses:
       *       201:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Project created
       */
      .post('/', this.projectController.createProject)
      /**
       * @swagger
       * /v1/project/{projectId}/mentorship:
       *   post:
       *     tags: [Project]
       *     summary: Create mentorship for project
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
       *               budgetPercentage:
       *                 type: integer
       *               restriction:
       *                 type: string
       *     responses:
       *       201:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Proposal mentorship created
       */
      .post(
        '/:projectId/mentorship',
        this.projectController.createProjectMentorship,
      )
      /**
       * @swagger
       * /v1/project/{projectId}/proposal/{proposalId}:
       *   patch:
       *     tags: [Project]
       *     summary: Update proposal status
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: projectId
       *         required: true
       *       - in: path
       *         name: proposalId
       *         required: true
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               status:
       *                 type: string
       *                 enum: [Accepted, Rejected]
       *               applicantId:
       *                 type: integer
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: string
       *               example: Update proposal status success
       */
      .patch(
        '/:projectId/proposal/:proposalId',
        this.projectController.updateProposalStatus,
      );

    return projectRouter;
  };
};
