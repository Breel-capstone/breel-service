'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "title" on table "user"
 *
 **/

var info = {
  revision: 3,
  name: 'noname',
  created: '2023-05-10T15:34:38.701Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'changeColumn',
    params: [
      'user',
      'title',
      {
        type: Sequelize.STRING,
        field: 'title'
      },
      {
        transaction: transaction
      }
    ]
  }];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'changeColumn',
    params: [
      'user',
      'title',
      {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  }];
};

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function(queryInterface, Sequelize, _commands)
  {
    var index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function(resolve, reject) {
        function next() {
          if (index < commands.length)
          {
            let command = commands[index];
            console.log('[#'+index+'] execute: ' + command.fn);
            index++;
            queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
          }
          else
            resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: function(queryInterface, Sequelize)
  {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function(queryInterface, Sequelize)
  {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
  info: info
};
