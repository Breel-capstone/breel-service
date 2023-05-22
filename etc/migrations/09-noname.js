'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "role_id" from table "proposal"
 * createTable "project", deps: []
 * changeColumn "projectId" on table "proposal"
 * changeColumn "projectId" on table "proposal"
 *
 **/

var info = {
  revision: 9,
  name: 'noname',
  created: '2023-05-22T14:09:23.975Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
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
    fn: 'createTable',
    params: [
      'project',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        title: {
          type: Sequelize.INTEGER,
          field: 'title',
          allowNull: false
        },
        description: {
          type: Sequelize.INTEGER,
          field: 'description',
          allowNull: false
        },
        durationMonth: {
          type: Sequelize.INTEGER,
          field: 'duration_month',
          allowNull: false
        },
        budget: {
          type: Sequelize.INTEGER,
          field: 'budget'
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
    fn: 'changeColumn',
    params: [
      'proposal',
      'project_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'project_id',
        onDelete: 'CASCADE',
        references: {
          model: 'project',
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
      'project_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'project_id',
        onDelete: 'CASCADE',
        references: {
          model: 'project',
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
    fn: 'dropTable',
    params: ['project', {
      transaction: transaction
    }]
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
    fn: 'changeColumn',
    params: [
      'proposal',
      'project_id',
      {
        type: Sequelize.INTEGER,
        field: 'project_id',
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
      'project_id',
      {
        type: Sequelize.INTEGER,
        field: 'project_id',
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
