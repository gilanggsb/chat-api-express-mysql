// Make express server
const { routes } = require("./src/routes/mainRoutes");
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Middlewares
app.use(morgan("common"));
app.use(bodyParser.json());

routes.forEach(element => {
    app.use("/api/" + element.name, require("./src/modules/" + element.path));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
