const fs = require('fs');
const path = require('path');

module.exports = class File {
  static isExist = (globalDir, fileDir) => {
    return fs.existsSync(path.join(globalDir, fileDir));
  };

  static write = (globalDestDir, fileDestDir, content) => {
    return fs.writeFileSync(path.join(globalDestDir, fileDestDir), content);
  };

  static read = (globalDestDir, fileDestDir) => {
    return fs.readFileSync(path.join(globalDestDir, fileDestDir), {
      encoding: 'utf8',
      flag: 'r',
    });
  };
};
