const Sequelize = require("sequelize");
const db = new Sequelize('campaigns', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
});

module.exports = db;