// Make express server
const directory = "./src/routes/";
const { config, connectDb } = require("./src/database/config");
const fs = require("fs");
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Middlewares
app.use(morgan("common"))
app.use(bodyParser.json())

fs.readdir(directory, (err, files) => {
    files.forEach(file => {
        app.use("/api/" + file.slice(0, -3), require("./src/routes/" + file));
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
