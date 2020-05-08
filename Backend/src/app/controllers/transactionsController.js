const Transaction = require("../models/transaction");

module.exports = {
    //@desc     Get all transactions form a user
    //@route    GET /transactions/:id
    //@access   JWT Private
    async index(req, res, next) {
        try {
            const transactions = await Transaction.find({
                user: req.params.userid,
            });
            return res.status(200).json({
                success: true,
                count: transactions.length,
                data: transactions,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: "Could not list the transactions",
            });
        }
    },

    //@desc     Add transactions
    //@route    POST /transactions
    //@access   JWT Private
    async create(req, res, next) {
        const { text, amount } = req.body;

        try {
            const transaction = await Transaction.create({
                text,
                amount,
                user: req.userId,
            });
            return res.status(201).json({
                success: true,
                data: transaction,
            });
        } catch (err) {
            if (err.name === "ValidationError") {
                const messages = Object.values(err.errors).map(
                    (val) => val.message
                );

                return res.status(400).json({
                    success: false,
                    error: messages,
                });
            } else {
                res.status(500).json({
                    success: false,
                    Error: "Could not create the transaction",
                });
            }
        }
    },

    //@desc     Delete Transaction
    //@route    DELETE /transactions/:id
    //@access   JWT Private
    async delete(req, res, next) {
        try {
            const transaction = await Transaction.findByIdAndRemove(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                data: transaction,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                Error: "Could not delete the transaction",
            });
        }
    },
};
