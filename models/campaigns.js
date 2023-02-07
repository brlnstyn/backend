const Sequelize = require("sequelize");
const db = require('../config/database');

const {DataTypes} = Sequelize;

const Campaigns = db.define('campaigns', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    campaign_name : DataTypes.STRING,
    client_name : DataTypes.STRING,
    setup_domicile: DataTypes.STRING,
    setup_age_start: DataTypes.STRING,
    setup_age_end: DataTypes.STRING,
    setup_gender: DataTypes.STRING,
    setup_profession: DataTypes.STRING,
    setup_martial_status: DataTypes.STRING,
    setup_age_married: DataTypes.STRING,
    setup_total_respondent: DataTypes.INTEGER,
    setup_respondent_blacklist: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.INTEGER,
    total_blasting: DataTypes.INTEGER,
    blasting_endtime: DataTypes.STRING,
}, {
    freezeTableNames: true,
    timestamps: true
});

module.exports = Campaigns;

