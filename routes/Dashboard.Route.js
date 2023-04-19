const express = require("express")
const { BugModel } = require("../models/Bug.Model")

const bugController = express.Router()

bugController.post("/report", async (req, res) => {
    const bug = req.body


    await res.send("Bug")
})


module.exports = { bugController }