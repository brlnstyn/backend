const database = require("../config/database.js");
const Sequelize = require("sequelize");

const db = {};

db.campaigns = require("./campaigns.js");
db.respondents = require("./respondents.js");

db.campaigns.hasMany(db.respondents, { as: "respondents" });
db.respondents.belongsTo(db.campaigns, {
  foreignKey: "province",
  as: "provinsi",
});

module.exports = db;