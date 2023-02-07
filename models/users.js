const Sequelize = require("sequelize");
const db = require('../config/database');

const {DataTypes} = Sequelize;

const User = db.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username : DataTypes.STRING,
    password : DataTypes.STRING,
    jwt_token: DataTypes.STRING,
}, {
    freezeTableNames: true,
    timestamps: true
});

module.exports = User;

