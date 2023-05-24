const notificationRouter = require('express').Router();

module.exports = class NotificationRoute {
  constructor(notificationController, middleware) {
    this.notificationController = notificationController;
    this.authMiddleware = middleware.auth;
  }

  /**
   * @swagger
   *components:
   *  schemas:
   *    Notification:
   *      type: object
   *      properties:
   *        id:
   *          type: integer
   *        userId:
   *          type: integer
   *        title:
   *          type: string
   *        message:
   *          type: string
   *        thumbnailUrl:
   *          type: string
   *        source:
   *          type: string
   *        isRead:
   *          type: boolean
   */

  getRoutes = () => {
    notificationRouter.use(this.authMiddleware.verifyToken);
    notificationRouter
      /**
       * @swagger
       * /v1/notification:
       *   get:
       *     tags: [Notification]
       *     summary: Get user notification list
       *     security:
       *       - bearerAuth: []
       *     responses:
       *       200:
       *         content:
       *           application/json:
       *             schema:
       *               type: array
       *               items:
       *                 type: object
       *                 allOf:
       *                   - $ref: '#/components/schemas/Notification'
       *                   - $ref: '#/components/schemas/UtilityField'
       */
      .get('/', this.notificationController.getNotificationList);

    return notificationRouter;
  };
};
