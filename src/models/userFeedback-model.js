module.exports = (sequelize, Sequelize) => {
  const UserFeedback = sequelize.define(
    'UserFeedback',
    {
      freelancerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: false,
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
      tableName: 'user_feedback',
      underscored: true,
      timestamps: true,

      indexes: [{ fields: ['freelancer_id', 'date'], unique: true }],
    },
  );

  UserFeedback.associate = (models) => {
    UserFeedback.belongsTo(models.User, {
      foreignKey: 'freelancerId',
      as: 'freelancer',
    });
  };

  return UserFeedback;
};
