'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "action", deps: []
 * createTable "role", deps: []
 * createTable "role_action", deps: [role, action]
 *
 **/

var info = {
  revision: 1,
  name: 'noname',
  created: '2023-05-10T11:10:18.227Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'createTable',
    params: [
      'action',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          defaultValue: true
        },
        createdBy: {
          type: Sequelize.STRING,
          field: 'created_by'
        },
        updatedBy: {
          type: Sequelize.STRING,
          field: 'updated_by'
        },
        deletedBy: {
          type: Sequelize.STRING,
          field: 'deleted_by'
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at'
        }
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'role',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          field: 'name',
          allowNull: false
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          defaultValue: true
        },
        createdBy: {
          type: Sequelize.STRING,
          field: 'created_by'
        },
        updatedBy: {
          type: Sequelize.STRING,
          field: 'updated_by'
        },
        deletedBy: {
          type: Sequelize.STRING,
          field: 'deleted_by'
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at'
        }
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'createTable',
    params: [
      'role_action',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        roleId: {
          type: Sequelize.INTEGER,
          field: 'role_id',
          onDelete: 'CASCADE',
          references: {
            model: 'role',
            key: 'id'
          },
          allowNull: false
        },
        actionId: {
          type: Sequelize.INTEGER,
          field: 'action_id',
          onDelete: 'CASCADE',
          references: {
            model: 'action',
            key: 'id'
          },
          allowNull: false
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          defaultValue: true
        },
        createdBy: {
          type: Sequelize.STRING,
          field: 'created_by'
        },
        updatedBy: {
          type: Sequelize.STRING,
          field: 'updated_by'
        },
        deletedBy: {
          type: Sequelize.STRING,
          field: 'deleted_by'
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at'
        }
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
    fn: 'dropTable',
    params: ['action', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['role', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['role_action', {
      transaction: transaction
    }]
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
