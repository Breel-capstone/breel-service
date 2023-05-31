const proposalRouter = require('express').Router();

module.exports = class ProjectRoute {
  constructor(log, proposalController, middleware) {
    this.log = log;
    this.proposalController = proposalController;
    this.authMiddleware = middleware.auth;
  }
  /**
   * @swagger
   * components:
   *   schemas:
   *     Proposal:
   *       type: object
   *       properties:
   *         id: 
   *           type: integer
   *           format: int32
   *         projectId: 
   *           type: integer
   *           format: int32
   *         freelancerId: 
   *           type: integer
   *           format: int32
   *         price: 
   *           type: integer
   *           format: int32
   *         durationMonth: 
   *           type: integer
   *           format: int32
   *         coverLetter: 
   *           type: string
   *         status: 
   *           type: string

   */

  getRoutes = () => {
    proposalRouter.use(this.authMiddleware.verifyToken);
    proposalRouter
      /**
       * @swagger
       * /v1/proposal/{proposalId}:
       *   get:
       *     tags: [Proposal]
       *     summary: Get proposal detail
       *     security:
       *       - bearerAuth: []
       *     parameters:
       *       - in: path
       *         name: proposalId
       *         required: true
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
       *                     - $ref: '#/components/schemas/Proposal'
       *                     - $ref: '#/components/schemas/UtilityField'
       */
      .get('/:id', this.proposalController.getProposalById);

    return proposalRouter;
  };
};
