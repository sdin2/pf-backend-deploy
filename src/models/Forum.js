const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("forum", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    othersUsersLike: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    users_response: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
