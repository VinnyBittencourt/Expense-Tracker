const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(PORT, console.log("Servidor rodando".blue.bold));
