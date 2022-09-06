const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("mission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: "https://cdn-icons-png.flaticon.com/512/1628/1628441.png",
    },
    coinsRewards: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    route: {
      type: DataTypes.STRING,
      defaultValue: "home",
    },
  });
};
