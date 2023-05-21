const Jadwal = require("../models/JadwalModels");

// get all jadwal
const getAllJadwal = async (req, res) => {
  try {
    const jadwal = await Jadwal.findAll();
    // jika panjang dari jadwal 0 maka tidak ada data
    if (jadwal.length === 0) {
      // tetap response 200
      res.status(200).json({
        message: "Jadwal not found",
        count: jadwal.length,
        data: jadwal,
      });
    }
    // jika ada data maka tampilkan
    else {
      res.status(200).json({
        message: "Jadwal found",
        count: jadwal.length,
        data: jadwal,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// get jadwal by id
const GetJadwalbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const jadwal = await Jadwal.findByPk(id);
    // if data null
    if (!jadwal) {
      res.status(404).json({
        message: "Jadwal not found",
      });
    } else {
      res.status(200).json({
        message: "Jadwal found",
        data: jadwal,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// create jadwal
const createJadwal = async (req, res) => {
  try {
    const { id_user, invoice_id, tanggal_pengiriman, jam, status } = req.body;
    console.log(req.body);

    // Buat jadwal pengiriman menggunakan metode model Sequelize
    const jadwal = await Jadwal.create({
      invoice_id,
      tanggal_pengiriman,
    });

    res.status(201).json({
      message: "Jadwal created successfully",
      data: jadwal,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message, // Menggunakan pesan kesalahan yang tepat
      message: "Jadwal creation failed",
    });
  }
};

// delete jadwal
const deleteJadwal = async (req, res) => {
  const { id } = req.params;
  try {
    const jadwal = await Jadwal.findByPk(id);
    // if data null
    if (!jadwal) {
      res.status(404).json({
        message: "Jadwal not found",
      });
    } else {
      await jadwal.destroy();
      res.status(200).json({
        message: "Jadwal deleted successfully",
        data: jadwal,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

// update jadwal
const updateJadwal = async (req, res) => {
  const { id } = req.params;
  try {
    const jadwal = await Jadwal.findByPk(id);
    // if data null
    if (!jadwal) {
      res.status(404).json({
        message: "Jadwal not found",
      });
    } else {
      const { id_user, id_invoice, tanggal, jam, status } = req.body;
      await jadwal.update({
        id_user,
        id_invoice,
        tanggal,
        jam,
        status,
      });
      res.status(200).json({
        message: "Jadwal updated successfully",
        data: jadwal,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
};

module.exports = {
  getAllJadwal,
  GetJadwalbyid,
  createJadwal,
  deleteJadwal,
  updateJadwal,
};
