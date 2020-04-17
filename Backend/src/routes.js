const express = require("express");

const authMiddleware = require("./app/middlewares/auth");

const authController = require("./app/controllers/authController");
const projectController = require("./app/controllers/projectController");

const routes = express.Router();

// routes.use(authMiddleware);

routes.post("/auth/register", authController.create);
routes.post("/auth/authenticate", authController.login);
routes.post("/auth/forgot_password", authController.forgotPassword);
routes.post("/auth/reset_password", authController.resetPassword);

routes.get("/projects/", authMiddleware, projectController.index);
routes.get("/projects/:projectId", authMiddleware, projectController.show);
routes.post("/projects/", authMiddleware, projectController.create);
routes.put("/projects/:projectId", authMiddleware, projectController.put);
routes.delete("/projects/:projectId", authMiddleware, projectController.delete);

module.exports = routes;
