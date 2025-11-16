const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const app = express();

mongoose.connect("mongodb+srv://ananya_mongodbuser:Test12345678@cluster0.mwazadh.mongodb.net/tasknest?retryWrites=true&w=majority")
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "tasknest-secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/calendar", calendarRoutes);
app.use("/tasks", tasksRoutes);
app.use("/settings", settingsRoutes);

app.get("/", (req, res) => {
    res.redirect("/user/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
