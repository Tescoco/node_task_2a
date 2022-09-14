const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Analytic = sequelize.define(
  "Analytic",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    widget_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    browser_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    modelName: "Analytic",
    tableName: "analytic"
  }
);

Analytic.sync();

module.exports = Analytic;
