const InvoiceModels = require("../models/InvoiceModels");

// create invoice
const createInvoice = async (req, res) => {
  const { user_id, client_id, tanggal, jumlah, status_pembayaran, qr_code } =
    req.body;

  InvoiceModels.create({
    user_id: user_id,
    client_id: client_id,
    tanggal: tanggal,
    jumlah: jumlah,
    status_pembayaran: status_pembayaran,
    qr_code: qr_code,
  })
    .then((result) => {
      res.status(201).json({
        message: "Invoice created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getInvoice = async (req, res) => {
  const { id } = req.params;

  InvoiceModels.get(id)
    .then((result) => {
      res.status(200).json({
        message: "Invoice found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getAllInvoice = async (req, res) => {
  InvoiceModels.getAll()
    .then((result) => {
      res.status(200).json({
        message: "Invoice found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

// update invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { user_id, client_id, tanggal, jumlah, status_pembayaran, qr_code } =
    req.body;

  const invoice = {
    user_id: user_id,
    client_id: client_id,
    tanggal: tanggal,
    jumlah: jumlah,
    status_pembayaran: status_pembayaran,
    qr_code: qr_code,
  };

  InvoiceModels.update(invoice, { where: { invoice_id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Invoice updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

// delete invoice
const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  InvoiceModels.destroy({ where: { invoice_id: id } })
    .then((result) => {
      res.status(200).json({
        message: "Invoice deleted successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

module.exports = {
    createInvoice,
    getInvoice,
    getAllInvoice,
    updateInvoice,
    deleteInvoice,
};