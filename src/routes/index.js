const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const path = require('path');
const RouteHelper = require('./helper');
const Context = require('../../sdk/context');

module.exports = class Route {
  constructor(config, log) {
    this.config = config;
    this.log = log;
    this.app = express();
    this.helper = new RouteHelper(config, log);
    this.app.use(express.json());
    this.initSwagger();

    this.registerRoutes();
  }

  registerRoutes = () => {
    this.app.use(this.helper.addFieldsToContext);
    this.app.use(this.helper.bodyLogger);

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
    this.app.get('/ping', this.helper.ping);

    this.app.use(this.helper.errorHandler);
    this.app.use(this.helper.notFoundHandler);
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

  initSwagger = () => {
    const { Swagger: swaggerConfig } = this.config;
    const swaggerOptions = {
      definition: {
        openapi: swaggerConfig.Openapi,
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
        servers: [
          {
            url: `${this.config.Meta.Protocol}://${this.config.Meta.Host}`,
          },
        ],
      },
      apis: swaggerConfig.APIs,
    };

    this.swaggerSpecs = swaggerJsDoc(swaggerOptions);
  };
};
