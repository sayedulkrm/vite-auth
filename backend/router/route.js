const express = require("express");
const route = express.Router();
const controller = require("../controller/usercontroller.js");
const auth = require("../authentication/auth.js");

route.get("/", (req, res) => {
    res.send("Hello World!");
});

route.post("/register", controller.register);
route.post("/login", controller.login);
route.get("/profile", auth, controller.profile);

module.exports = route;
