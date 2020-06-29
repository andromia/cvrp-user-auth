import { Application } from "express";
import config from "config";

// Import Controllers
import register from "./controllers/register";

export default (app: Application) => {
    app.use(config.get("BASE_PATH") + register.path, register.router);
};
