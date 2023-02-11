const directory = "./src/modules";
const fs = require("fs");

const getAllRoutes = () => {
    const modules = fs.readdirSync(directory);
    const routesData = [];
    modules.forEach(module => {
        const file = fs.readdirSync(`${directory}/${module}/routes`);
        const filePath = `${module}/routes/${file}`;
        const fileName = filePath.slice(filePath.lastIndexOf("/") + 1, -3);
        const result = { "path": filePath, "name": fileName };
        routesData.push(result);
    });
    return routesData;
}
const routes = getAllRoutes();
module.exports = { routes };