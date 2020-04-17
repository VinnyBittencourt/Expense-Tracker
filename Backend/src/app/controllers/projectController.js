const Project = require("../models/project");
const Task = require("../models/task");

module.exports = {
    async index(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async show(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async create(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async put(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async delete(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },
};
