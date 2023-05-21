const db = require("../config/database");

const { DataTypes } = require("sequelize");

// Tabel Klien (Clients):

// client_id: int (primary key)
// nama: varchar
// alamat: varchar
// email: varchar
// nomor_telepon: varchar

const Client = db.define("client", {
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: false,
        },
    },
    nomor_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true,
            len: [10, 13],
        },
    },
});


module.exports = Client;