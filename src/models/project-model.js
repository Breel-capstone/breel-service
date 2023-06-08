module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    'Project',
    {
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      durationMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      budget: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      budgetString: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          'Mencari',
          'Menunggu Konfirmasi Freelancer' ,
          'Sedang Berjalan',
          'Selesai',
        ),
        defaultValue: 'Mencari',
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      mentorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      // Utility columns
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedBy: {
        type: Sequelize.STRING,
      },
      deletedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      tableName: 'project',
      underscored: true,
      timestamps: true,
    },
  );

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'clientId',
      as: 'user',
    });
    Project.hasMany(models.Proposal, {
      foreignKey: 'projectId',
      as: 'proposals',
    });
    Project.hasOne(models.ProjectMentorship, {
      foreignKey: 'projectId',
      as: 'projectMentorship',
    });
  };
  return Project;
};
