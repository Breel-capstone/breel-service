require('dotenv').config();
const ConfigBuilder = require('./sdk/configbuilder');
const File = require('./sdk/file');
const ConfigReader = require('./sdk/configreader');
const Logger = require('./sdk/log');
const Route = require('./src/routes');

const configPath = 'etc/config.json';

initServer = async () => {
  let config;
  if (process.env.ENVIRONMENT == 'development') {
    if (!File.isExist(__dirname, configPath)) {
      const configBuilder = new ConfigBuilder();
      await configBuilder.buildConfig();
    }
    config = ConfigReader.readConfig(__dirname, './etc/config.json');
  } else if (process.env.ENVIRONMENT == 'staging') {
    config = ConfigReader.readConfig('/', 'secret/config.json');
  }

  const log = new Logger(config.Log.Level);

  const route = new Route(config, log);

  route.run();
};

initServer();
