'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
    }

    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  User.init({
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
  }, {
    sequelize,
    tableName : 'users',
    modelName: 'User',
  });
  return User;
};