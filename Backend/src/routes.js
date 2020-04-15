const express = require("express");

const authMiddleware = require("./middlewares/auth");

const authController = require("./controllers/authController");
const projectController = require("./controllers/projectController");

const routes = express.Router();

// routes.use(authMiddleware);

routes.post("/auth/register", authController.create);
routes.post("/auth/authenticate", authController.login);

routes.get("/projects", authMiddleware, projectController.index);

module.exports = routes;
