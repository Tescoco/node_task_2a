"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes;

var sequelize = require("../utils/database");

var Analytic = sequelize.define("Analytic", {
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
}, {
  sequelize: sequelize,
  modelName: "Analytic",
  tableName: "analytic"
});
Analytic.sync();
module.exports = Analytic;