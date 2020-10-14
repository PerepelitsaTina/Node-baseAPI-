
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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullname: {
      type: DataTypes.STRING
    },
    email: {
      validate: {
        isEmail: {
          msg: "Incorrect email"
        }
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
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: "password" },
    }
  });
  return User;
};