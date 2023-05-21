const ClientModel = require("../models/ClientModels");

const getAllClient = async (req, res) => {
  try {
  //  jika panjang nol maka tidak ada data
    const clients = await ClientModel.findAll();
    // count
    const count = await ClientModel.count();
    if (clients.length === 0) {
      res.status(404).json({
        message: "Client not found",
        count
      });
    }
    // jika ada data maka tampilkan
    else {
      res.status(200).json({
        message: "Client found",
        count,
        data: clients,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

const GetClientbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await ClientModel.findByPk(id);
    // if data null
    if (!client) {
      res.status(404).json({
        message: "Client not found",
      });
    } else {
      res.status(200).json({
        message: "Client found",
        data: client,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

const createClient = async (req, res) => {
  try {
    const { nama, alamat, no_telp, email } = req.body;
    // create client use model method sequelize
    const client = await ClientModel.create({
      nama,
      alamat,
      nomor_telepon: no_telp,
      email,
    });
    // jika berhasil
    res.status(201).json({
      message: "Client created successfully",
      data: client,
    });
  } catch (err) {
    res.status(400).json({
      error: "Client not created",
      message: err.errors[0].message,
    });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await ClientModel.destroy({
      where: {
        client_id: id,
      },
    });
    // jika sama dengan nol berarti client tidak ada di database
    if (!client) {
      res.status(404).json({
        message: "Client not found",
      });
    } else {
      res.status(200).json({
        message: "Client deleted successfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Client not deleted",
    });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  try {
    const { nama, alamat, no_telp, email } = req.body;
    // update client use model method sequelize
    const client = await ClientModel.update(
      {
        nama,
        alamat,
        nomor_telepon: no_telp,
        email,
      },
      {
        where: {
          client_id: id,
        },
      }
    );
    // jika berhasil maka tampilkan data yang telah diupdate
    if (client) {
      res.status(200).json({
        message: "Client updated successfully",
        data: {
          nama,
          alamat,
          nomor_telepon: no_telp,
          email,
        },
      });
    } else {
      res.status(404).json({
        message: "Client not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Client not updated",
      message: err.message,
    });
  }
};

module.exports = {
  getAllClient,
  GetClientbyid,
  createClient,
  deleteClient,
  updateClient,
};
