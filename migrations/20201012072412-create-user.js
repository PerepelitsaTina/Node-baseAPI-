'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        validate: {
          isEmail: {
            msg: "Incorrect email"
          }
        },
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
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
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};