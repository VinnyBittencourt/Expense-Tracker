const Project = require("../models/project");
const Task = require("../models/task");

module.exports = {
    async index(req, res) {
        try {
            const projects = await Project.find();

            return res.send({ projects });
        } catch (err) {
            return res.status(400).send({ error: "Error loading projects" });
        }
    },

    async show(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async create(req, res) {
        try {
            const project = await Project.create({
                ...req.body,
                user: req.userId,
            });
            return res.send({ project });
        } catch (err) {
            return res.status(400).send({ error: "Could not create project" });
        }
    },

    async put(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },

    async delete(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },
};
