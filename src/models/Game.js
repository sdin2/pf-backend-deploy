const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("game", {
    apiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
  });
};
