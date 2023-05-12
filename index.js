require('dotenv').config();

const ConfigBuilder = require('./sdk/configbuilder');
const File = require('./sdk/file');
const ConfigReader = require('./sdk/configreader');
const Logger = require('./sdk/log');
const AuthLib = require('./sdk/authlib');
const RouteHelper = require('./src/routes/helper');
const Middleware = require('./src/middlewares');
const Controller = require('./src/controllers');
const Route = require('./src/routes');

const configPath = 'etc/config.json';
initServer = async () => {
  let config;
  const configBuilder = new ConfigBuilder();

  if (process.env.ENVIRONMENT == 'development') {
    if (!File.isExist(__dirname, configPath)) {
      await configBuilder.buildConfig();
    }
    config = ConfigReader.readConfig(__dirname, './etc/config.json');
  } else if (process.env.ENVIRONMENT == 'staging') {
    config = ConfigReader.readConfig('/', 'secret/config.json');
  }

  configBuilder.buildSequelizeConfig(config);
  const sequelizeModel = require('./src/models');


  const authLib = new AuthLib(config);
  const log = new Logger(config.Log.Level);

  const routeHelper = new RouteHelper(config, log);
  const middleware = new Middleware(config, log, authLib, routeHelper);
  const controller = new Controller(log, config, routeHelper, authLib, sequelizeModel);
  const route = new Route(config, log, routeHelper, controller, middleware);

  route.run();
};

initServer();
