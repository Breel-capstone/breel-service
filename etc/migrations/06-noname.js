'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "user_project"
 * createTable "user_project_experience", deps: [user]
 *
 **/

var info = {
  revision: 6,
  name: 'noname',
  created: '2023-05-19T09:53:25.776Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'dropTable',
    params: ['user_project', {
      transaction: transaction
    }]
  },
  {
    fn: 'createTable',
    params: [
      'user_project_experience',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
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
        title: {
          type: Sequelize.STRING,
          field: 'title',
          allowNull: false
        },
        thumbnailUrl: {
          type: Sequelize.TEXT,
          field: 'thumbnail_url'
        },
        description: {
          type: Sequelize.TEXT,
          field: 'description'
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
    params: ['user_project_experience', {
      transaction: transaction
    }]
  },
  {
    fn: 'createTable',
    params: [
      'user_project',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
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
        title: {
          type: Sequelize.STRING,
          field: 'title',
          allowNull: false
        },
        thumbnailUrl: {
          type: Sequelize.TEXT,
          field: 'thumbnail_url'
        },
        description: {
          type: Sequelize.TEXT,
          field: 'description'
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
