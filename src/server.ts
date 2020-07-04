import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import config from "config";
import mongoose from "mongoose";
import passport from "passport";
import redis from "redis";
const redisStore = require("connect-redis")(session);

import routes from "./routes/index";
import strategy from "./passport/index";

const client = redis.createClient({ host: "redis", port: "6379" });

const PORT = 8080;
const COOKIE_EXPIRY = 60 * 60 * 1000 * 2; // 2 days

// Setup Mongoose connection
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connection.on("open", ref => {
    console.log("User auth connected to Mongo!");
});

mongoose.connection.on("error", err => {
    console.log("User auth IS NOT connected to Mongo!");
});

let mongoURI = "mongodb://mongo:27017/user";
mongoose.connect(mongoURI, options);

const serverStart = (app: Application, passport: any) => {
    // App configuration
    app.use(cors());
    app.use(cookieParser(config.get("COOKIE_SECRET")));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
        session({
            rolling: true,
            resave: false,
            saveUninitialized: true,
            secret: config.get("COOKIE_SECRET"),
            cookie: { maxAge: COOKIE_EXPIRY, secure: false },
            store: new redisStore({ host: "localhost", port: 6379, client: client, ttl: 260 })
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    strategy(app, passport);

    // Initialize Routes
    routes(app);

    // Start server
    app.listen(PORT, () => console.log("Listening on port " + PORT));
};

serverStart(express(), passport);
