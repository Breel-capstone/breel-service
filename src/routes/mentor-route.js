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
      .get('/', this.paginationMiddleware, this.mentorController.getMentors)
      /**
       * @swagger
       * /v1/mentor/applicant:
       *   get:
       *     tags: [Mentor]
       *     summary: Get Daily Mentor applicant list
       *     security:
       *       - bearerAuth: []
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 acceptedApplicants:
       *                   type: array
       *                   items:
       *                     type: object
       *                     allOf:
       *                       - $ref: '#/components/schemas/User'
       *                       - $ref: '#/components/schemas/UtilityField'
       *                     properties:
       *                       skills:
       *                         type: array
       *                         items:
       *                           type: string
       *                 pendingApplicants:
       *                   type: array
       *                   items:
       *                     type: object
       *                     allOf:
       *                       - $ref: '#/components/schemas/User'
       *                       - $ref: '#/components/schemas/UtilityField'
       *                     properties:
       *                       skills:
       *                         type: array
       *                         items:
       *                           type: string
       */
      .get('/applicant', this.mentorController.getMentoringApplicants)

      /**
       * @swagger
       * /v1/mentor/accept-applicant:
       *   patch:
       *     tags: [Mentor]
       *     summary: Accept a Mentee into Daily Mentoring
       *     security:
       *       - bearerAuth: []
       *     requestBody:
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               status:
       *                 type: string
       *                 enum: [Approved, Rejected]
       *               applicantId:
       *                 type: integer
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                message: 
       *                  type: object
       *                  properties: 
       *                    title: 
       *                      type: string
       *                    body: 
       *                      type: string
       *                meta: 
       *                  type: object
       *                  properties: 
       *                    path: 
       *                      type: string
       *                    statusCode: 
       *                      type: integer
       *                      format: int32
       *                    timestamp: 
       *                      type: string
       *                      format: date-time
       *                    requestId: 
       *                      type: string
       *                    timeElapsed: 
       *                      type: string
       *                data: 
       *                  type: string
       *                  format: nullable
       *                pagination: 
       *                  type: string
       *                  format: nullable
       */
      .patch('/accept-applicant', this.mentorController.acceptMentee);

    return mentorRouter;
  };
};
