'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user_feedback", deps: [role]
 * addIndex "user_feedback_freelancer_id_date" to table "user_feedback"
 *
 **/

var info = {
  revision: 20,
  name: 'noname',
  created: '2023-06-03T15:28:30.035Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'createTable',
    params: [
      'user_feedback',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        freelancerId: {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          field: 'freelancer_id',
          onDelete: 'CASCADE',
          references: {
            model: 'role',
            key: 'id'
          },
          allowNull: false
        },
        date: {
          type: Sequelize.DATE,
          field: 'date',
          allowNull: false
        },
        feedback: {
          type: Sequelize.TEXT,
          field: 'feedback',
          allowNull: false
        },
        summary: {
          type: Sequelize.TEXT,
          field: 'summary',
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
    fn: 'addIndex',
    params: [
      'user_feedback',
      ['freelancer_id', 'date'],
      {
        indexName: 'user_feedback_freelancer_id_date',
        name: 'user_feedback_freelancer_id_date',
        indicesType: 'UNIQUE',
        type: 'UNIQUE',
        transaction: transaction
      }
    ]
  }
  ];
};
var rollbackCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['user_feedback', {
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
