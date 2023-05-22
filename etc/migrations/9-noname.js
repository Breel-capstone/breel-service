'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_id" from table "mentor"
 * removeColumn "role_id" from table "proposal"
 * removeColumn "user_id" from table "proposal"
 * removeColumn "user_id" from table "user"
 * addColumn "freelancerId" to table "mentor"
 * addColumn "freelancerId" to table "proposal"
 *
 **/

var info = {
  revision: 9,
  name: 'noname',
  created: '2023-05-22T07:55:15.435Z',
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
  },
  {
    fn: 'removeColumn',
    params: [
      'proposal',
      'role_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'proposal',
      'user_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'user',
      'user_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'mentor',
      'freelancer_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'freelancer_id',
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
    fn: 'addColumn',
    params: [
      'proposal',
      'freelancer_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'freelancer_id',
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
      'mentor',
      'freelancer_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'proposal',
      'freelancer_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'user',
      'user_id',
      {
        type: Sequelize.INTEGER,
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'mentor',
          key: 'id'
        },
        allowNull: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'proposal',
      'role_id',
      {
        type: Sequelize.INTEGER,
        field: 'role_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model: 'role',
          key: 'id'
        },
        allowNull: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
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
    fn: 'addColumn',
    params: [
      'mentor',
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
