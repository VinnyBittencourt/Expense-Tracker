const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://admin:apolo100@expensetrackerdb-cyafx.mongodb.net/test?retryWrites=true&w=majority",
    { useMongoClient: true }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
