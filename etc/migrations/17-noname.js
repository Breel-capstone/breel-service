'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "mentor"
 * createTable "daily_mentoring", deps: [user]
 *
 **/

var info = {
  revision: 17,
  name: 'noname',
  created: '2023-05-25T06:15:25.932Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['mentor', {
      transaction: transaction
    }]
  },
  {
    fn: 'createTable',
    params: [
      'daily_mentoring',
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
            model: 'user',
            key: 'id'
          },
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
    params: ['daily_mentoring', {
      transaction: transaction
    }]
  },
  {
    fn: 'createTable',
    params: [
      'mentor',
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
          field: 'freelancer_id',
          onDelete: 'CASCADE',
          references: {
            model: 'user',
            key: 'id'
          },
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
