const express = require("express");

const authController = require("./controllers/authController");

const routes = express.Router();

routes.post("/auth/register", authController.create);
routes.post("/auth/authenticate", authController.login);

module.exports = routes;
