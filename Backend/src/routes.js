const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const authMiddleware = require("./app/middlewares/auth");

const authController = require("./app/controllers/authController");
const projectController = require("./app/controllers/projectController");
const transactionsController = require("./app/controllers/transactionsController");

const routes = express.Router();

// routes.use(authMiddleware);

routes.post(
    "/auth/register",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required().min(4),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(4),
        }),
    }),
    authController.create
);
routes.post(
    "/auth/authenticate",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(4),
        }),
    }),
    authController.login
);
routes.post("/auth/forgot_password", authController.forgotPassword);
routes.post("/auth/reset_password", authController.resetPassword);

routes.get("/projects/", authMiddleware, projectController.index);
routes.get("/projects/:projectId", authMiddleware, projectController.show);
routes.post("/projects/", authMiddleware, projectController.create);
routes.put("/projects/:projectId", authMiddleware, projectController.put);
routes.delete("/projects/:projectId", authMiddleware, projectController.delete);

routes.get(
    "/transactions/:userid",
    authMiddleware,
    transactionsController.index
);
routes.post(
    "/transactions",
    authMiddleware,
    celebrate({
        [Segments.BODY]: Joi.object()
            .keys({
                text: Joi.string().required().min(1),
                amount: Joi.number().required(),
            })
            .unknown(),
    }),
    transactionsController.create
);
routes.delete(
    "/transactions/:id",
    authMiddleware,
    transactionsController.delete
);

module.exports = routes;
