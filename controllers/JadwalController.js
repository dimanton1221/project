const Jadwal = require("../models/JadwalModels");

// get all jadwal
const getAllJadwal = async (req, res) => {
  try {
    const jadwal = await Jadwal.findAll();
    res.status(200).json({
      message: "Jadwal found",
      data: jadwal,
    });
  } catch (err) {
    res.status(400).json({
      error: err.errors,
    });
  }
}

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
    }else{
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
}

// create jadwal
const createJadwal = async (req, res) => {
  try {
    const { id_user, id_invoice, tanggal, jam, status } = req.body;
    const result = await Jadwal.createJadwal(id_user, id_invoice, tanggal, jam, status);
    res.status(201).json({
      message: "Jadwal created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      error: "Jadwal not created",
    });
  }
}

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
    }else{
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
}

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
    }else{
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
}


module.exports = {
  getAllJadwal,
  GetJadwalbyid,
  createJadwal,
  deleteJadwal,
  updateJadwal,
};
