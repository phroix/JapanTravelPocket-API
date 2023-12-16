/*
  Sequelize is a promise-based Node.js ORM tool for MYSQL. Features solid transaction support, relations and more.
  Initialize Sequelize
  Add Entitys to a database Object
*/

const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize"); // import Sequelize

//create Sequelize object
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

// create db object with sequelized entitys
const db = {};

db.Sequelize = Sequelize; //for Datatypes and SQL Operations
db.sequelize = sequelize; //created sequelize object

// import entity with (sequelize, Sequelize)
db.cost = require("./cost.entity")(sequelize, Sequelize);

module.exports = db;