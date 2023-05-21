const InvoiceModels = require("../models/InvoiceModels");

// get all invoice
const getAllInvoice = async (req, res) => {
    try {
        const invoices = await InvoiceModels.findAll();
        // jika kosong maka tidak ada data
        if (invoices.length === 0) {
            // tetap response 200
            res.status(200).json({
                message: "Invoice not found",
                count: invoices.length,
                data: invoices
            });
        }
        // jika ada data maka tampilkan
        else {
            res.status(200).json({
                message: "Invoice found",
                count: invoices.length,
                data: invoices
            });
        }
    } catch (err) {
        res.status(400).json({
            error: err.errors,
        });
    }
};

// by id
const getInvoicebyid = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await InvoiceModels.findByPk(id);
        // if data null
        if (!invoice) {
            res.status(200).json({
                message: "Invoice not found",
                data: invoice
            });
        } else {
            res.status(200).json({
                message: "Invoice found",
                data: invoice
            });
        }
    } catch (err) {
        res.status(400).json({
            error: err.errors,
        });
    }
};

// create
const createInvoice = async (req, res) => {
    try {
        const { user_id, client_id, tanggal, jumlah, status_pembayaran, qr_code } = req.body;
        // create invoice use model method sequelize
        // console.log(req.body);
        const invoice = await InvoiceModels.create({
            user_id,
            client_id,
            tanggal,
            jumlah,
            status_pembayaran,
            qr_code
        });
        // jika sukses langsung response
        if (invoice) {
            res.status(201).json({
                message: "Invoice created",
                data: invoice,
            });
        } else {
            res.status(400).json({
                message: "Invoice not created",
                data: invoice,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: "Invoice not created",
            error: err.errors,
        });
    }
};


// update invoice
const updateInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const { user_id, client_id, tanggal, jumlah, status_pembayaran, qr_code } = req.body;
        // update invoice use model method sequelize
        const invoice = await InvoiceModels.update({
            user_id,
            client_id,
            tanggal,
            jumlah,
            status_pembayaran,
            qr_code
        }, {
            where: {
                invoice_id: id
            }
        });
        // jika sukses langsung response
        if (invoice) {
            res.status(201).json({
                message: "Invoice updated",
                data: invoice,
            });
        } else {
            res.status(400).json({
                message: "Invoice not updated",
                data: invoice,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: "Invoice not updated",
            error: err,
        });
    }
};





module.exports = {
    getAllInvoice,
    getInvoicebyid,
    createInvoice,
    updateInvoice
}