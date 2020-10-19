'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../utils/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, { foreignKey: "authorId" });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set(password) {
        this.setDataValue("password", hashPassword(password))
      }
    },
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      defaultValue: "user"
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "disabled"],
      defaultValue: "active"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

