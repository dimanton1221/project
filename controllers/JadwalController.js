const Jadwal = require("../models/JadwalModels");

const createJadwal = async (req, res) => {
  const { id, tanggal, jam, status } = req.body;

  Jadwal.create({
    id: id,
    tanggal: tanggal,
    jam: jam,
    status: status,
  })
    .then((result) => {
      res.status(201).json({
        message: "Jadwal created successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getJadwal = async (req, res) => {
  const { id } = req.params;

  Jadwal.get(id)
    .then((result) => {
      res.status(200).json({
        message: "Jadwal found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const getAllJadwal = async (req, res) => {
  Jadwal.getAll()
    .then((result) => {
      res.status(200).json({
        message: "Jadwal found",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { tanggal, jam, status } = req.body;

  Jadwal.update(id, {
    tanggal: tanggal,
    jam: jam,
    status: status,
  })
    .then((result) => {
      res.status(200).json({
        message: "Jadwal updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.errors,
      });
    });
};

const deleteJadwal = async (req, res) => {
  const { id } = req.params;

  Jadwal.delete(id)
    .then((result) => {
      res.status(200).json({
        message: "Jadwal deleted successfully",
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
  createJadwal,
  getJadwal,
  getAllJadwal,
  updateJadwal,
  deleteJadwal,
};