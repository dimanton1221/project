const db = require("../config/database");
const { DataTypes } = require("sequelize");
const Invoice = require("./InvoiceModels");

const DeliverySchedule = db.define("delivery_schedule", {
  schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Invoice,
      key: "invoice_id",
    },
  },
  tanggal_pengiriman: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Invoice.hasMany(DeliverySchedule, {
    foreignKey: "invoice_id",
});

DeliverySchedule.belongsTo(Invoice, {
  foreignKey: "invoice_id",
});


module.exports = DeliverySchedule;
