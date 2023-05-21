const db = require('../config/database');
const { DataTypes } = require('sequelize');
const UserModels = require('../models/user');
const ClientModels = require('../models/ClientModels');

InvoiceModel = db.define('Invoice', {
    invoice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModels.User,
            key: 'user_id'
        }
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ClientModels,
            key: 'client_id'
        }
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status_pembayaran: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qr_code: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


// Define relationships

UserModels.User.hasMany(InvoiceModel, { foreignKey: 'user_id' });
InvoiceModel.belongsTo(UserModels.User, { foreignKey: 'user_id' });

ClientModels.hasMany(InvoiceModel, { foreignKey: 'client_id' });
InvoiceModel.belongsTo(ClientModels, { foreignKey: 'client_id' });

module.exports = InvoiceModel;
