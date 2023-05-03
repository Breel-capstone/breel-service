const File = require('../file');

module.exports = class ConfigReader {
  static readConfig = (globalDestDir, fileDestDir) => {
    const config = File.read(globalDestDir, fileDestDir);
    return JSON.parse(config);
  };
};
