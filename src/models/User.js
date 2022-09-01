const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    img: {
      type: DataTypes.STRING,
      allownull: true,
      defaultValue: "https://j.gifs.com/ygdY27.gif",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allownull: true,
      defaultValue: false,
    },
    bannedFlag: {
      type: DataTypes.BOOLEAN,
      allownull: true,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allownull: true,
    },
    matched_users: {
      type: DataTypes.JSON,
      defaultValue: [],
      allownull: true,
    },
    coins: {
      type: DataTypes.INTEGER,
      allownull: true,
      defaultValue: 0,
    },
    favoriteGames: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    servers: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    missionCompleted: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    plan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wantsMatch: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "Bienvenido a mi perfil!",
    },
    friends: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
  });
};
