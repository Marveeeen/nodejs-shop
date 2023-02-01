// USING MYSQL2
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "2355628123Aa.",
// });

// module.exports = pool.promise();

// USING sequelize

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "2355628123Aa.", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
