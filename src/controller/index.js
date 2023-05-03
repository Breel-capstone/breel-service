const express = require('express');
const ControllerHelper = require('./controllerHelper');
const Context = require('../../sdk/context');

module.exports = class Controller {
  constructor(config, log) {
    this.config = config;
    this.log = log;
    this.app = express();
    this.helper = new ControllerHelper(config, log);
    this.app.use(express.json());

    this.registerRoutes();
  }

  registerRoutes = () => {
    this.app.use(this.helper.addFieldsToContext);
    this.app.use(this.helper.bodyLogger);

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
};
