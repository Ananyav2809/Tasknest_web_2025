const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low"
    }
}, { timestamps: true });

module.exports = mongoose.model("Calendar", calendarSchema);
