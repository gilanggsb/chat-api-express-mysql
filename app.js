// Make express server
const { routes } = require("./src/routes/mainRoutes");
const { Sockets } = require("./src/utils/sockets");
const morgan = require("morgan");
const express = require("express");

const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// Middlewares
app.use(morgan("common"));
app.use(bodyParser.json());

// app.use('/', function (req, res, next) {
//     res.send("Hello world!");
// });

//implement routes
routes.forEach(element => {
    app.use("/api/" + element.name, require("./src/modules/" + element.path));
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
