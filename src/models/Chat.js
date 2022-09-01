const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("chat", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    messages: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  });
};
