const ClientModel = require("../models/ClientModels");

const createClient = async (req, res) => {
  const { nama, alamat, no_telp, email, password } = req.body;

  ClientModel.create({
    nama: nama,
    alamat: alamat,
    no_telp: no_telp,
    email: email,
    password: password,
  })
    .then((result) => {
      res.status(201).json({
        message: "Client created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getClient = async (req, res) => {
  const { id } = req.params;

  ClientModel.get(id)
    .then((result) => {
      res.status(200).json({
        message: "Client found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getAllClient = async (req, res) => {
  ClientModel.getAll()
    .then((result) => {
      res.status(200).json({
        message: "Client found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nama, alamat, no_telp, email, password } = req.body;

  ClientModel.update(id, {
    nama: nama,
    alamat: alamat,
    no_telp: no_telp,
    email: email,
    password: password,
  })
    .then((result) => {
      res.status(200).json({
        message: "Client updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  ClientModel.delete(id)
    .then((result) => {
      res.status(200).json({
        message: "Client deleted successfully",
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
  createClient,
  getClient,
  getAllClient,
  updateClient,
  deleteClient,
};
