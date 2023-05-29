'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "mentorId" on table "project_mentorship"
 * changeColumn "projectId" on table "project_mentorship"
 * changeColumn "projectId" on table "project_mentorship"
 *
 **/

var info = {
  revision: 19,
  name: 'noname',
  created: '2023-05-29T06:54:11.802Z',
  comment: ''
};

var migrationCommands = function(transaction) {
  return [{
    fn: 'changeColumn',
    params: [
      'project_mentorship',
      'mentor_id',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        field: 'mentor_id',
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
      'project_mentorship',
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
      'project_mentorship',
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
    fn: 'changeColumn',
    params: [
      'project_mentorship',
      'mentor_id',
      {
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
      {
        transaction: transaction
      }
    ]
  },
  {
    fn: 'changeColumn',
    params: [
      'project_mentorship',
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
      'project_mentorship',
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
