const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const path = require('path');
const Context = require('../../sdk/context');
const AuthRoute = require('./auth-route');
const UserRoute = require('./user-route');
const ProjectRoute = require('./project-route');
const MentorRoute = require('./mentor-route');
const NotificationRoute = require('./notification-route');
const ProposalRoute = require('./proposal-route');

module.exports = class Route {
  constructor(config, log, routeHelper, controller, middleware) {
    this.config = config;
    this.log = log;
    this.helper = routeHelper;
    this.controller = controller;
    this.middleware = middleware;

    this.userRoute = new UserRoute(
      this.config,
      this.log,
      this.controller.user,
      this.middleware,
    ).getRoutes();
    this.authRoute = new AuthRoute(
      this.config,
      this.log,
      this.controller.user,
    ).getRoutes();
    this.projectRoute = new ProjectRoute(
      this.log,
      this.controller.project,
      this.middleware,
    ).getRoutes();
    this.mentorRoute = new MentorRoute(
      this.config,
      this.log,
      this.controller.mentor,
      this.middleware,
    ).getRoutes();
    this.notificationRoute = new NotificationRoute(
      this.controller.notification,
      this.middleware,
    ).getRoutes();
    this.proposalRoute = new ProposalRoute (
      this.log,
      this.controller.proposal,
      this.middleware,
    ).getRoutes();

    this.app = express();
    this.app.use(express.json());
    this.initSwagger();

    this.registerRoutes();
  }

  initSwagger = () => {
    const { Swagger: swaggerConfig } = this.config;
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: swaggerConfig.Info.Title,
          version: swaggerConfig.Info.Version,
          description: swaggerConfig.Info.Description,
          contact: {
            name: swaggerConfig.Info.Contact.Name,
            email: swaggerConfig.Info.Contact.Email,
          },
          license: {
            name: 'Get the bearer token here',
            url: `${this.config.Meta.Protocol}://${this.config.Meta.Host}/dummy/login`,
          },
        },
        basePath: '/',
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        openapi: swaggerConfig.Openapi,
      },
      apis: swaggerConfig.APIs, // Path to the API docs
    };

    this.swaggerSpecs = swaggerJsDoc(swaggerOptions);
  };

  /**
   *@swagger
   *components:
   *  schemas:
   *    UtilityField:
   *      type: object
   *      properties:
   *        createdAt:
   *          type: string
   *          format: date-time
   *          example: 2020-12-31T23:59:59.999Z
   *        updatedAt:
   *          type: string
   *          format: date-time
   *          example: 2020-12-31T23:59:59.999Z
   *        deletedAt:
   *          type: string
   *          format: date-time
   *          example: 2020-12-31T23:59:59.999Z
   *          nullable: true
   *        createdBy:
   *          type: string
   *          nullable: true
   *        updatedBy:
   *          type: string
   *          nullable: true
   *        deletedBy:
   *          type: string
   *          nullable: true
   *    Pagination:
   *      type: object
   *      properties:
   *        currentPage:
   *          type: integer
   *        totalPages:
   *          type: integer
   *        currwntElements:
   *          type: integer
   *        totalElements:
   *          type: integer
   *  parameters:
   *    PageQuery:
   *      in: query
   *      name: page
   *      type: integer
   *      required: false
   *      description: Page number
   *      default: 1
   *    LimitQuery:
   *      in: query
   *      name: limit
   *      type: integer
   *      required: false
   *      description: Number of items to return
   *      default: 10
   *    DisableLimitQuery:
   *      in: query
   *      name: disableLimit
   *      type: boolean
   *      required: false
   *      description: Disable pagination
   *      schema:
   *        type: boolean
   *        default: false
   *        enum: [true, false]
   */

  registerRoutes = () => {
    this.app.use(cors());
    this.app.set('view engine', 'ejs');
    this.app.engine('html', require('ejs').renderFile);
    this.app.use(express.static('static'));
    this.app.get('/dummy/login', (req, res) => {
      res.render(
        path.join(__dirname, '../views/dummy-login.html'),
        this.config.Firebase.ClientConfig,
      );
    });

    this.app.use(
      '/swagger',
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerSpecs),
    );

    this.app.use(this.middleware.addFieldsToContext);
    this.app.use(this.middleware.bodyLogger);

    /**
     * @swagger
     * /ping:
     *   get:
     *     summary: Ping the server
     *     tags: [Health Check]
     *     responses:
     *       200:
     *         description: connected to server
     */
    this.app.get('/ping', this.controller.ping);

    this.app.use('/v1/auth', this.authRoute);
    this.app.use('/v1/user', this.userRoute);
    this.app.use('/v1/project', this.projectRoute);
    this.app.use('/v1/mentor', this.mentorRoute);
    this.app.use('/v1/notification', this.notificationRoute);
    this.app.use('/v1/proposal', this.proposalRoute);

    this.app.use(this.middleware.errorHandler);
    this.app.use(this.middleware.notFoundHandler);
  };

  run = () => {
    const ctx = new Context();

    const server = this.app.listen(this.config.Express.Port, () => {
      this.log.info(
        ctx,
        `Listening and serving in port ${this.config.Express.Port}`,
      );
    });

    const gracefulShutdownHandler = (signal) => {
      setTimeout(() => {
        this.log.info(ctx, 'Shutting down server');
        // stop the server from accepting new connections
        server.close(() => {
          this.log.info(ctx, 'Server successfully stopped');
          // once the server is not accepting connections, exit
          process.exit();
        });
      }, 0);
    };

    // The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
    process.on('SIGINT', gracefulShutdownHandler);

    // The SIGTERM signal is sent to a process to request its termination.
    process.on('SIGTERM', gracefulShutdownHandler);
  };
};
