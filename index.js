require('dotenv').config();
const ConfigBuilder = require('./sdk/configbuilder');
const File = require('./sdk/file');
const ConfigReader = require('./sdk/configreader');
const Logger = require('./sdk/log');
const Controller = require('./src/controller');
const Context = require('./sdk/context');

const configPath = 'etc/config.json';

if (!File.isExist(__dirname, configPath)) {
  new ConfigBuilder().buildConfig();
}

const config = ConfigReader.readConfig(__dirname, './etc/config.json');
const log = new Logger(config.Log.Level);

log.info(new Context(), 'test');

const controller = new Controller(config, log);

controller.run();
