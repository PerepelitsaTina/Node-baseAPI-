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
    }
  };
  User.init({
    fullname: {
      type: DataTypes.STRING
    },
    email: {
      validate: {
        isEmail: true
      },
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    birthday: {
      type: DataTypes.DATE
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue("password", hashPassword(value));
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: "password"
      },
    }
  });
  return User;
};