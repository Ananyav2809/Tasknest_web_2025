const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light"
    },
    notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false }
    },
    profile: {
        name: String,
        email: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);
