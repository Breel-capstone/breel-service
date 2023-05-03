require('dotenv').config();
const ConfigBuilder = require('./sdk/configbuilder');
const File = require('./sdk/file');
const ConfigReader = require('./sdk/configreader');
const Logger = require('./sdk/log');
const Controller = require('./src/controller');

const configPath = 'etc/config.json';

initServer = async () => {
  if (!File.isExist(__dirname, configPath)) {
    const configBuilder = new ConfigBuilder();
    await configBuilder.buildConfig();
  }

  const config = ConfigReader.readConfig(__dirname, './etc/config.json');
  const log = new Logger(config.Log.Level);

  const controller = new Controller(config, log);

  controller.run();
};

initServer();
