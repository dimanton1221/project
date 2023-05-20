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

DeliverySchedule.get = (id) => {
  try {
    return DeliverySchedule.findOne({
      where: {
        schedule_id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

DeliverySchedule.create = (data) => {
  try {
    return DeliverySchedule.create(data);
  } catch (error) {
    throw error;
  }
};

DeliverySchedule.update = (id, data) => {
  try {
    return DeliverySchedule.update(data, {
      where: {
        schedule_id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

DeliverySchedule.delete = (id) => {
  try {
    return DeliverySchedule.destroy({
      where: {
        schedule_id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

DeliverySchedule.getAll = () => {
  try {
    return DeliverySchedule.findAll();
  } catch (error) {
    throw error;
  }
};

Invoice.hasMany(DeliverySchedule, {
    foreignKey: "invoice_id",
});

DeliverySchedule.belongsTo(Invoice, {
  foreignKey: "invoice_id",
});

// sync with database
// DeliverySchedule.sync({
//   alter: true,
// });

module.exports = DeliverySchedule;
