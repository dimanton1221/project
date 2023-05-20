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

// make function function for create , get , update , delete
Client.create = (data) => {
    // if eror throw error
    try {
        return Client.create(data);
    } catch (error) {
        throw error;
    }
};

Client.getAll = () => {
    try {
        return Client.findAll();
    } catch (error) {
        throw error;
    }
};

// update
Client.update = (data, where) => {
    try {
        return Client.update(data, where);
    } catch (error) {
        throw error;
    }
};

// delete
Client.destroy = (where) => {
    try {
        return Client.destroy(where);
    } catch (error) {
        throw error;
    }
};

// get by id
Client.get = (id) => {
    try {
        return Client.findByPk(id);
    } catch (error) {
        throw error;
    }
};

// // sync model force
// Client.sync({
//     alter: true
// });


module.exports = Client;