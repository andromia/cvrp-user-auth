import { Application } from "express";
import config from "config";

// Import Controllers
import localAuth from "./controllers/local-auth";
import githubAuth from "./controllers/github-auth";
import googleAuth from "./controllers/google-auth";
import logout from "./controllers/logout";

export default (app: Application) => {
    app.use(config.get("BASE_PATH") + localAuth.path, localAuth.router);
    app.use(config.get("BASE_PATH") + githubAuth.path, githubAuth.router);
    app.use(config.get("BASE_PATH") + googleAuth.path, googleAuth.router);
    app.use(config.get("BASE_PATH") + logout.path, logout.router);
};
