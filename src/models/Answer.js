const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("answer", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
