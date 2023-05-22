'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "action", deps: []
 * createTable "project", deps: []
 * createTable "role", deps: []
 * createTable "user", deps: [role, mentor]
 * createTable "proposal", deps: [project]
 * createTable "role_action", deps: [role, action]
 * createTable "mentor", deps: [user]
 * createTable "user_experience", deps: [user]
 * createTable "user_project_experience", deps: [user]
 * createTable "user_skill", deps: [user]
 *
 **/

var info = {
  revision: 1,
  name: 'noname',
  created: '2023-05-22T13:19:51.783Z',
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
          onDelete: 'CASCADE',
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
          field: 'title'
        },
        description: {
          type: Sequelize.TEXT,
          field: 'description'
        },
        profileUrl: {
          type: Sequelize.TEXT,
          field: 'profile_url'
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
        userId: {
          type: Sequelize.INTEGER,
          field: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: {
            model: 'mentor',
            key: 'id'
          },
          allowNull: true
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
          onUpdate: 'CASCADE',
          field: 'project_id',
          onDelete: 'CASCADE',
          references: {
            model: 'project',
            key: 'id'
          },
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
          onUpdate: 'CASCADE',
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
          onUpdate: 'CASCADE',
          field: 'action_id',
          onDelete: 'CASCADE',
          references: {
            model: 'action',
            key: 'id'
          },
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
      'mentor',
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
    params: ['mentor', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['project', {
      transaction: transaction
    }]
  },
  {
    fn: 'dropTable',
    params: ['proposal', {
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
  },
  {
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
    params: ['user_project_experience', {
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
