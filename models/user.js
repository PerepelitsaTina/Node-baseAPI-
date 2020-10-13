'use strict';
const {
  Model
} = require('sequelize');
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
      validate: {
        len: {
          args: [3, 20],
          msg: "Min password length is 3, max is 20"
        },
        notContains: {
          args: [" "],
          msg: "Password can't contain spaces"
        }
      },
      allowNull: false,
      type: DataTypes.STRING
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
      attributes: { exclude: ['password'] },
    }
  });
  return User;
};