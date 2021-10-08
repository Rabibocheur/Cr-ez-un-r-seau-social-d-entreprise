'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      avatar: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "http://127.0.0.1:3000/images/pngegg.png",
      },
      couverture: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "http://127.0.0.1:3000/images/couverture.jpg",
      },
      bio: {
        allowNull: true,
        type: DataTypes.STRING
      },
      isAdmin: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};