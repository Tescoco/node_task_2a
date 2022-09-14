"use strict";

var Sequelize = require("sequelize");

var sequelize = new Sequelize("node_task", "root", "Ajoke007!", {
  dialect: "mysql",
  host: "localhost"
});
sequelize.authenticate().then(function () {
  return console.log("Datebase is up");
})["catch"](function (err) {
  return console.log(err);
});
module.exports = sequelize;