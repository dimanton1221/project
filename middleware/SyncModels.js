// const 
const ClientsModels = require("../models/ClientModels")
const InvoiceModels = require("../models/InvoiceModels")
const JadwalModels = require("../models/JadwalModels")
const UserModels = require("../models/UserModels")

// buatkan fungsi sync urut
const sync = async (req, res) => {
    try {
        await ClientsModels.sync({ alter: true })
        await UserModels.sync({ alter: true })
        await InvoiceModels.sync({ alter: true })
        await JadwalModels.sync({ alter: true })
        console.log("Sync success")
    } catch (err) {
        console.log(err)
    }
}

module.exports = sync;