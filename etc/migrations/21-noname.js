'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "budgetString" to table "project"
 *
 **/

var info = {
  revision: 21,
  name: 'noname',
  created: '2023-06-06T07:13:11.093Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'addColumn',
    params: [
      'project',
      'budget_string',
      {
        type: Sequelize.STRING,
        field: 'budget_string'
      },
      {
        transaction: transaction
      }
    ]
  }];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'removeColumn',
    params: [
      'project',
      'budget_string',
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
