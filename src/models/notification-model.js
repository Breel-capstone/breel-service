module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      userId: {
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
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      thumbnailUrl: {
        type: Sequelize.TEXT,
        defaultValue: 'https://via.placeholder.com/150',
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: 'notification',
      underscored: true,
      timestamps: true,
    },
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return Notification;
};
