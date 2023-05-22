'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "user_id" from table "project"
 * removeColumn "is_approved" from table "proposal"
 * removeColumn "user_id" from table "proposal"
 * removeColumn "user_id" from table "user"
 * createTable "project_mentorship", deps: [user]
 * addColumn "freelancerId" to table "mentor"
 * addColumn "assigneeId" to table "project"
 * addColumn "mentorId" to table "project"
 * addColumn "status" to table "project"
 * addColumn "clientId" to table "project"
 * addColumn "status" to table "proposal"
 * addColumn "freelancerId" to table "proposal"
 * changeColumn "userId" on table "mentor"
 *
 **/

var info = {
  revision: 12,
  name: 'noname',
  created: '2023-05-22T19:05:30.913Z',
  comment: ''
};

var migrationCommands = function(transaction) {
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
    fn: 'removeColumn',
    params: [
      'proposal',
      'is_approved',
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
          field: 'project_id',
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
    fn: 'addColumn',
    params: [
      'mentor',
      'freelancer_id',
      {
        type: Sequelize.INTEGER,
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
      'project',
      'assignee_id',
      {
        type: Sequelize.INTEGER,
        field: 'assignee_id',
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
      'project',
      'mentor_id',
      {
        type: Sequelize.INTEGER,
        field: 'mentor_id',
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
      'project',
      'status',
      {
        type: Sequelize.ENUM('Mencari', 'Sedang Berjalan', 'Selesai'),
        field: 'status',
        defaultValue: 'Mencari'
      },
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'project',
      'client_id',
      {
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
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'addColumn',
    params: [
      'proposal',
      'status',
      {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
        field: 'status',
        defaultValue: 'Pending'
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
  },
  {
    fn: 'changeColumn',
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
      'project',
      'assignee_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'project',
      'mentor_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'project',
      'status',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'project',
      'client_id',
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'removeColumn',
    params: [
      'proposal',
      'status',
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
    fn: 'dropTable',
    params: ['project_mentorship', {
      transaction: transaction
    }]
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
      'is_approved',
      {
        type: Sequelize.BOOLEAN,
        field: 'is_approved',
        defaultValue: false
      },
      {
        transaction: transaction
      }
    ]
  },
  {
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
    fn: 'addColumn',
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
