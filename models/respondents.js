const Sequelize = require("sequelize");
const db = require('../config/database');

const {DataTypes} = Sequelize;

const Respondents = db.define('database_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    entry_date : DataTypes.STRING,
    respondent_code : DataTypes.STRING,
    respondent_name: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    districts: DataTypes.STRING,
    ward: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    family_members: DataTypes.STRING,
    education: DataTypes.STRING,
    occupation: DataTypes.STRING,
    expense: DataTypes.STRING,
    source_water: DataTypes.STRING,
    source_energy: DataTypes.STRING,
    filename: DataTypes.STRING,
    status: DataTypes.INTEGER,
}, {
    freezeTableNames: true,
    timestamps: true
});

module.exports = Respondents;

