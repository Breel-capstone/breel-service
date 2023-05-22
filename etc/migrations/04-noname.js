'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "is_active" from table "action"
 * removeColumn "is_active" from table "role"
 * removeColumn "is_active" from table "role_action"
 * removeColumn "is_active" from table "user"
 * removeColumn "is_active" from table "user_experience"
 * removeColumn "is_active" from table "user_project"
 * removeColumn "is_active" from table "user_skill"
 * changeColumn "actionId" on table "role_action"
 * changeColumn "roleId" on table "role_action"
 * changeColumn "roleId" on table "user"
 *
 **/

var info = {
  revision: 4,
  name: 'noname',
  created: '2023-05-12T10:59:15.838Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'removeColumn',
    params: [
      'action',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'role',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'role_action',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'user',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'user_experience',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'user_project',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'user_skill',
      'is_active',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'role_action',
      'action_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'action_id',
        onDelete: 'CASCADE',
        references: {
          model: 'action',
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
      'role_action',
      'role_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'role_id',
        onDelete: 'CASCADE',
        references: {
          model: 'role',
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
      'user',
      'role_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'role_id',
        references: {
          model: 'role',
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
    fn: 'addColumn',
    params: [
      'action',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'role',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'role_action',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'user',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'user_experience',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'user_project',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'user_skill',
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_active',
        defaultValue: true
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'role_action',
      'action_id',
      {
        type: Sequelize.INTEGER,
        field: 'action_id',
        onDelete: 'CASCADE',
        references: {
          model: 'action',
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
      'role_action',
      'role_id',
      {
        type: Sequelize.INTEGER,
        field: 'role_id',
        onDelete: 'CASCADE',
        references: {
          model: 'role',
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
      'user',
      'role_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        field: 'role_id',
        references: {
          model: 'role',
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
