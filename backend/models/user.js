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
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: true,
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        is: /^(?=.*\d).{4,8}$/
      }
    },
    avatar: {
      allowNull: false,
      type: DataTypes.STRING
    },
    couverture: {
      allowNull: false,
      type: DataTypes.STRING
    },
    bio: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isConnected: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    connectedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    tableName : 'users',
    modelName: 'User',
  });
  return User;
};