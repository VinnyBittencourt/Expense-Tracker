const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async create(req, res) {
        const { email } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: "User already exists" });
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({ user, token: generateToken({ id: user.id }) });
        } catch (err) {
            res.status(400).send({ error: "Registration Failed" });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: "Invalid Password" });
        }

        user.password = undefined;

        res.send({ user, token: generateToken({ id: user.id }) });
    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            const token = crypto.randomBytes(20).toString("hex");

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                $set: {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                },
            });

            mailer.sendMail(
                {
                    to: email,
                    from: "vinnyroockey@gmail.com",
                    template: "/forgot_password",
                    context: { token },
                },
                (err) => {
                    if (err) {
                        return res.status(400).send({
                            error: "Cannot send forgot password email",
                        });
                    }

                    return res.send();
                }
            );
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Error on forgot password, try again",
            });
        }
    },

    async resetPassword(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email }).select(
                "+passwordResetToken passwordResetExpires"
            );

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            if (token !== user.passwordResetToken) {
                return res.status(400).send({ error: "Token invalid" });
            }

            const now = new Date();

            if (now > user.passwordResetExpires) {
                return res
                    .status(400)
                    .send({ error: "Token expired, generate a new one" });
            }

            user.password = password;

            await user.save();

            res.send();
        } catch (err) {
            console.log(err);
            res.status(400).send({ error: "Cannot reset password, try again" });
        }
    },
};
