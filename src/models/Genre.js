const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genre", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    games: {
      type: DataTypes.JSON,
    },
  });
};
