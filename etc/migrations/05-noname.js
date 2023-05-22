'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "proposal", deps: [role]
 *
 **/

var info = {
  revision: 5,
  name: 'noname',
  created: '2023-05-16T17:00:39.254Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'createTable',
    params: [
      'proposal',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        projectId: {
          type: Sequelize.INTEGER,
          field: 'project_id',
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          field: 'user_id',
          allowNull: false
        },
        price: {
          type: Sequelize.INTEGER,
          field: 'price',
          allowNull: false
        },
        durationMonth: {
          type: Sequelize.INTEGER,
          field: 'duration_month',
          allowNull: false
        },
        coverLetter: {
          type: Sequelize.TEXT,
          field: 'cover_letter'
        },
        isApproved: {
          type: Sequelize.BOOLEAN,
          field: 'is_approved',
          defaultValue: false
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
        },
        roleId: {
          type: Sequelize.INTEGER,
          field: 'role_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: {
            model: 'role',
            key: 'id'
          },
          allowNull: true
        }
      },
      {
        transaction: transaction
      }
    ]
  }];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['proposal', {
      transaction: transaction
    }]
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
