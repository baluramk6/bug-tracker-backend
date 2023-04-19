const mongoose = require("mongoose")

const bugSchema = new mongoose.Schema({
    criticalBug: {
        type: Array,
    },
    majorBug: {
        type: Array,
    },
    mediumBug: {
        type: Array,
    },
    lowBug: {
        type: Array,
    },
})

const BugModel = mongoose.model("bug", bugSchema)

module.exports = { BugModel }