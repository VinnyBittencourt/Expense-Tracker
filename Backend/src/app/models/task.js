const mongoose = require("../../database/index");
const bcrypt = require("bcryptjs");

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            require: true,
        },
        AssignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        completed: {
            type: Boolean,
            require: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
