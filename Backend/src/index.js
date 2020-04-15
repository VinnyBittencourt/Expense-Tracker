const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        Server: "Hello World!",
    });
});

app.use(express.json());
app.listen(3333, () => {
    console.log("Servidor rodando");
});
