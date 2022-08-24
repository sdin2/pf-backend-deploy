const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("game", {
    apiId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
