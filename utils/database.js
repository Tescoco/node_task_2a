const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_task", "root", "Ajoke007!", {
  dialect: "mysql",
  host: "localhost"
});

sequelize.authenticate().then(() => console.log("Datebase is up")).catch((err) => console.log(err));

module.exports = sequelize;
