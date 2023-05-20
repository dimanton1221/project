const sequelize = require('sequelize');

require('dotenv').config();
// connection to database
const db = new sequelize(process.env.MYSQL);

module.exports = db;