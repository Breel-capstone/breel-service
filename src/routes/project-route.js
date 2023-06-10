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
   *         budgetString:
   *           type: string
   *         status:
   *           type: string
   *         skills:
   *           type: array
   *           items:
   *             type: string
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
       *              skills:
       *                type: array
       *                items:
       *                  type: string
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
       *     description: |
       *       berikut alur acc project (yang di bold adalah yang bisa dilakukan di endpoint ini):
       *       1. client buat project
       *       2. mentor buat proposal
       *       3. **client acc proposal**
       *       4. **mentor acc project**
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
       *                 datas:
       *                   type: object
       *                   allOf:
       *                     - $ref: '#/components/schemas/Project'
       */
      .get(
        '/',
        this.paginationMiddleware,
        this.projectController.getProjectList,
      )
      /**
       * @swagger
       * /v1/project/{projectId}:
       *   get:
       *     summary: Get project detail by Id
       *     tags: [Project]
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: projectId
       *         required: true
       *         schema:
       *           type: integer
       *         description: The project id
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
       *                 meta:
       *                   type: object
       *                   properties:
       *                     path:
       *                       type: string
       *                     statusCode:
       *                       type: integer
       *                       format: int32
       *                     timestamp:
       *                       type: string
       *                       format: date-time
       *                     requestId:
       *                       type: string
       *                     timeElapsed:
       *                       type: string
       *                 data:
       *                   type: object
       *                   allOf:
       *                     - $ref: '#/components/schemas/Project'
       *                     - $ref: '#/components/schemas/UtilityField'
       *
       */
      .get('/:id', this.projectController.getProjectById)
      /**
       * @swagger
       * /v1/project/{projectId}/proposal:
       *   get:
       *     summary: Get project's proposal
       *     tags: [Project]
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: projectId
       *         required: true
       *         schema:
       *           type: integer
       *         description: The project id
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 type: object
       *                 properties:
       *                   id:
       *                     type: integer
       *                   applicantId:
       *                     type: integer
       *                   applicantUid:
       *                     type: string
       *                   applicantName:
       *                     type: string
       *                   applicantProfileUrl:
       *                     type: string
       *                   applicantSkills:
       *                     type: array
       *                     items:
       *                       type: string
       *                   status:
       *                      type: string
       */
      .get('/:projectId/proposal', this.projectController.getProjectProposal)
      /**
       * @swagger
       * /v1/project/mentor:
       *   get:
       *     tags: [Project]
       *     summary: Get project mentorship list for mentor
       *     security:
       *       - bearerAuth: []
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 data:
       *                   type: object
       *                   allOf:
       *                     - $ref: '#/components/schemas/Project'
       */
      .get('/mentor', this.projectController.getProjectMentorshipList);

    return projectRouter;
  };
};
