const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("new", {
    article_content: {
      type: DataTypes.STRING,
      allownull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    short_description: {
      type: DataTypes.STRING,
      allownull: false,
    },
    main_image: {
      type: DataTypes.STRING,
      allownull: false,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
