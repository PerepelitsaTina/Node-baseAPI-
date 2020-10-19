'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAndSubscriber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserAndSubscriber.init({
    user_id: DataTypes.INTEGER,
    subscriber_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAndSubscriber',
  });
  return UserAndSubscriber;
};