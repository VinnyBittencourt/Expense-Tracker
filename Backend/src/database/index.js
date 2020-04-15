const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://admin:apolo100@expensetrackerdb-cyafx.mongodb.net/expenseTrackerDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

module.exports = mongoose;
