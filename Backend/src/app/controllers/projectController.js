const Project = require("../models/project");
const Task = require("../models/task");

module.exports = {
    async index(req, res) {
        try {
            const projects = await Project.find().populate(["user", "tasks"]); // Populate pegar todas informações daquele User atravéz do UserID que foi passado na criação

            return res.send({ projects });
        } catch (err) {
            return res.status(400).send({ error: "Error loading projects" });
        }
    },

    async show(req, res) {
        try {
            const project = await Project.findById(
                req.params.projectId
            ).populate("user"); // Populate pegar todas informações daquele User atravéz do UserID que foi passado na criação

            return res.send({ project });
        } catch (err) {
            return res.status(400).send({ error: "Error loading project" });
        }
    },

    async create(req, res) {
        try {
            const { title, description, tasks } = req.body;
            const project = await Project.create({
                title,
                description,
                user: req.userId,
            });

            await Promise.all(
                tasks.map(async (task) => {
                    const projectTask = new Task({
                        ...task,
                        project: Project._id,
                    });

                    await projectTask.save();

                    project.tasks.push(projectTask);
                })
            );

            await project.save();

            return res.send({ project });
        } catch (err) {
            return res.status(400).send({ error: "Could not create project" });
        }
    },

    async put(req, res) {
        try {
            const { title, description, tasks } = req.body;
            const project = await Project.findByIdAndUpdate(
                req.params.projectId,
                {
                    title,
                    description,
                    user: req.userId,
                },
                { new: true } // Para retornar o projeto atualizado na res
            );

            project.tasks = [];

            await Task.remove({ project: project._id });

            await Promise.all(
                tasks.map(async (task) => {
                    const projectTask = new Task({
                        ...task,
                        project: Project._id,
                    });

                    await projectTask.save();

                    project.tasks.push(projectTask);
                })
            );

            await project.save();

            return res.send({ project });
        } catch (err) {
            return res.status(400).send({ error: "Could not update project" });
        }
    },

    async delete(req, res) {
        try {
            const project = await Project.findByIdAndRemove(
                req.params.projectId
            ).populate("user"); // Populate pegar todas informações daquele User atravéz do UserID que foi passado na criação

            return res.send();
        } catch (err) {
            return res.status(400).send({ error: "Error deleting project" });
        }
    },
};
