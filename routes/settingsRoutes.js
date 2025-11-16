const express = require("express");
const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.session.user) return next();
    return res.redirect("/login");
}

router.get("/", isLoggedIn, (req, res) => {
    res.render("settings", { user: req.session.user });
});

module.exports = router;
