const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("answer", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
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
