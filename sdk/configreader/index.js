const File = require('../file');

module.exports = class ConfigReader {
  static readConfig = (globalDestDir, fileDestDir) => {
    const config = File.read(globalDestDir, fileDestDir);
    const configRes = JSON.parse(config);
    return configRes;
  };

  static setDatabaseConfig = (databaseConfig) => {
    const {
      Driver: driver,
      Host: host,
      Port: port,
      DB: database,
      User: username,
      Password: password,
      Options: options,
    } = databaseConfig;

    process.env.DATABASE_URL = `${driver}://${username}:${password}@${host}:${port}/${database}?connection_limit=${options.MaxOpen}`;
  };
};
