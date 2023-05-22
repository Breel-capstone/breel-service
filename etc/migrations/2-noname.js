'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "user", deps: [role]
 * createTable "user_experience", deps: [user]
 * createTable "user_project", deps: [user]
 * createTable "user_skill", deps: [user]
 *
 **/

var info = {
  revision: 2,
  name: 'noname',
  created: '2023-05-10T11:35:46.415Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'createTable',
    params: [
      'user',
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'id',
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        uid: {
          type: Sequelize.STRING,
          field: 'uid',
          unique: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          unique: true,
          allowNull: false
        },
        roleId: {
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
        fullName: {
          type: Sequelize.STRING,
          field: 'full_name',
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
        profileUrl: {
          type: Sequelize.TEXT,
          field: 'profile_url'
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
      'user_experience',
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
        companyName: {
          type: Sequelize.STRING,
          field: 'company_name',
          allowNull: false
        },
        location: {
          type: Sequelize.STRING,
          field: 'location',
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          field: 'title',
          allowNull: false
        },
        startDate: {
          type: Sequelize.DATE,
          field: 'start_date',
          allowNull: false
        },
        endDate: {
          type: Sequelize.DATE,
          field: 'end_date',
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          field: 'description'
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
      'user_skill',
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
        skillName: {
          type: Sequelize.STRING,
          field: 'skill_name',
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
    params: ['user', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['user_experience', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['user_project', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['user_skill', {
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
