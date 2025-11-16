const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    day: Number,
    month: Number,
    year: Number,
    name: String,
    description: String,
    priority: {
        type: String,
        enum: ["high", "medium", "low"]
    }
});
module.exports = mongoose.model("dashboard", dashboardSchema);
