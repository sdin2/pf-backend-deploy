const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reward", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allownull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recompenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allownull: true,
      defaultValue: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
