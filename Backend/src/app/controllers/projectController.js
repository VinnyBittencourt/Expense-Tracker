module.exports = {
    async index(req, res) {
        res.send({ ok: "Hello World", user: req.userId });
    },
};
