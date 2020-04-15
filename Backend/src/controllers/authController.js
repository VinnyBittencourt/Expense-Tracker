const User = require("../models/user");

module.exports = {
    async create(req, res) {
        try {
            const user = await User.create(req.body);

            return res.send({ user });
        } catch (err) {
            res.status(400).send({ error: "Registration Failed" });
        }
    },
};
