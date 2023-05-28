'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "daily_mentoring_applicant", deps: [user, daily_mentoring]
 *
 **/

var info = {
  revision: 18,
  name: 'noname',
  created: '2023-05-28T10:49:48.003Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'createTable',
    params: [
      'daily_mentoring_applicant',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        applicantId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          field: 'applicant_id',
          onDelete: 'CASCADE',
          references: {
            model: 'user',
            key: 'id'
          },
          allowNull: false
        },
        dailyMentoringId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: {
            model: 'daily_mentoring',
            key: 'id'
          },
          field: 'daily_mentoring_id',
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
          field: 'status',
          defaultValue: 'Pending'
        },
        expiredAt: {
          type: Sequelize.DATE,
          field: 'expired_at',
          allowNull: true
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
  }];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['daily_mentoring_applicant', {
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
