'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "userId" to table "project"
 * changeColumn "budget" on table "project"
 * changeColumn "description" on table "project"
 * changeColumn "userId" on table "proposal"
 * changeColumn "userId" on table "proposal"
 *
 **/

var info = {
  revision: 10,
  name: 'noname',
  created: '2023-05-22T14:17:27.466Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'addColumn',
    params: [
      'project',
      'user_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'project',
      'budget',
      {
        type: Sequelize.INTEGER,
        field: 'budget',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'project',
      'description',
      {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'proposal',
      'user_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'proposal',
      'user_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  }
  ];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'removeColumn',
    params: [
      'project',
      'user_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'project',
      'budget',
      {
        type: Sequelize.INTEGER,
        field: 'budget'
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'project',
      'description',
      {
        type: Sequelize.INTEGER,
        field: 'description',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'proposal',
      'user_id',
      {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'proposal',
      'user_id',
      {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false
      },
      {
        transaction: transaction
      }
    ]
  }
  ];
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
