const projectRouter = require('express').Router();

module.exports = class ProjectRoute {
  constructor(log, projectController, middleware) {
    this.log = log;
    this.projectController = projectController;
    this.authMiddleware = middleware.auth;
    this.paginationMiddleware = middleware.paginate;
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     Project:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         clientId:
   *           type: integer
   *         title:
   *           type: string
   *         description:
   *           type: string
   *         durationMonth:
   *           type: integer
   *         budget:
   *           type: integer
   *         status:
   *           type: string
   *         skills:
   *           type: string
   *         mentorId:
   *           type: integer
   *         assigneeId:
   *           type: integer
   */

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
      )
      /**
       * @swagger
       * /v1/project:
       *   get:
       *     tags: [Project]
       *     summary: Get project list
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - $ref: '#/components/parameters/PageQuery'
       *       - $ref: '#/components/parameters/LimitQuery'
       *       - $ref: '#/components/parameters/DisableLimitQuery'
       *       - in: query
       *         name: status
       *         type: string
       *         description: Project status
       *         schema:
       *           type: string
       *           enum: [Mencari, Sedang Berjalan, Selesai]
       *           default: Mencari
       *       - in: query
       *         name: isMentored
       *         type: boolean
       *         description: is Project has mentorship
       *         schema:
       *           type: boolean
       *           enum: [true, false]
       *           default: false
       *       - in: query
       *         name: keyword
       *         type: string
       *         description: Project search keyword
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
       *                       - $ref: '#/components/schemas/Project'
       *                       - $ref: '#/components/schemas/UtilityField'
       *                 pagination:
       *                   type: object
       *                   $ref: '#/components/schemas/Pagination'
       */
      .get(
        '/',
        this.paginationMiddleware,
        this.projectController.getProjectList,
      );

    return projectRouter;
  };
};
