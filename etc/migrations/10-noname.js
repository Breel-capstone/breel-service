'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "project", deps: [user]
 * createTable "project_mentorship", deps: [project, user]
 * changeColumn "projectId" on table "proposal"
 * changeColumn "projectId" on table "proposal"
 *
 **/

var info = {
  revision: 10,
  name: 'noname',
  created: '2023-05-22T08:50:56.158Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
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
        clientId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          field: 'client_id',
          onDelete: 'CASCADE',
          references: {
            model: 'user',
            key: 'id'
          },
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          field: 'title',
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          field: 'description'
        },
        skills: {
          type: Sequelize.TEXT,
          field: 'skills'
        },
        status: {
          type: Sequelize.ENUM('Mencari', 'Sedang Berjalan', 'Selesai'),
          field: 'status',
          defaultValue: 'Mencari'
        },
        price: {
          type: Sequelize.BIGINT,
          field: 'price',
          allowNull: false
        },
        durationMonth: {
          type: Sequelize.INTEGER,
          field: 'duration_month',
          allowNull: false
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
      'project_mentorship',
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
          onUpdate: 'CASCADE',
          field: 'project_id',
          onDelete: 'CASCADE',
          references: {
            model: 'project',
            key: 'id'
          },
          allowNull: false
        },
        mentorId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
          field: 'mentor_id',
          references: {
            model: 'user',
            key: 'id'
          },
          allowNull: false
        },
        budgetPercentage: {
          type: Sequelize.FLOAT,
          field: 'budget_percentage',
          allowNull: false
        },
        restriction: {
          type: Sequelize.TEXT,
          field: 'restriction'
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
        onDelete: 'CASCADE',
        references: {
          model: 'project',
          key: 'id'
        },
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'project',
          key: 'id'
        },
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
var rollbackCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['project', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['project_mentorship', {
      transaction: transaction
    }]
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
