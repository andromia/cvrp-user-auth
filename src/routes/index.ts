import { Application } from "express";
import config from "config";

// Import Controllers
import register from "./controllers/register";
import login from "./controllers/login";
import logout from "./controllers/logout";

export default (app: Application) => {
    app.use(config.get("BASE_PATH") + register.path, register.router);
    app.use(config.get("BASE_PATH") + login.path, login.router);
    app.use(config.get("BASE_PATH") + logout.path, logout.router);
};
