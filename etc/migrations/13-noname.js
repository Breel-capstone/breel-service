'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_id" from table "mentor"
 *
 **/

var info = {
  revision: 13,
  name: 'noname',
  created: '2023-05-22T20:35:18.153Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'removeColumn',
    params: [
      'mentor',
      'user_id',
      {
        transaction: transaction
      }
    ]
  }];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'addColumn',
    params: [
      'mentor',
      'user_id',
      {
        type: Sequelize.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: true
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
