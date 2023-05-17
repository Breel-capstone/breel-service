'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const ConfigReader = require(__dirname + '../../../sdk/configreader');
const env = process.env.NODE_ENV || 'development';
const db = {};

let config;
let sequelize;

if (!process.env.ENVIRONMENT || process.env.ENVIRONMENT == 'development') {
  config = require(__dirname + '../../../etc/sequelize-config.json')[env];
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config,
    );
} else if (
  process.env.ENVIRONMENT == 'staging' ||
  process.env.ENVIRONMENT == 'production'
) {
  config = ConfigReader.readConfig('/', 'secret/config.json');
  sequelize = new Sequelize(
    config.SQL.Database,
    config.SQL.Username,
    config.SQL.Password,
    {
      dialect: config.SQL.Dialect,
      host: config.SQL.Host,
      benchmark: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
