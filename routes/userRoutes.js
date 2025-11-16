const express = require("express");
const router = express.Router();
const users = require("../models/user");

router.post("/new", async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.json({ success: false, message: "Missing fields" });
        }

        const newUser = await users.create({ name, password });

        req.session.user = newUser;

        return res.json({
            success: true,
            message: "Signup successful! Redirecting...",
            redirect: "/dashboard"
        });

    } catch (err) {
        console.log("Signup error:", err);
        return res.json({ success: false, message: "Signup failed" });
    }
});

module.exports = router;
