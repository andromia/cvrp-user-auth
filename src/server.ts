import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import config from "config";
import mongoose from "mongoose";

import authenticator from "./passport/index";
import routes from "./routes/index";

const PORT = 8080;
const COOKIE_EXPIRY = 60 * 60 * 1000 * 2; // 2 days

// Setup Mongoose connection
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
// };

// mongoose.connection.on("open", (ref) => {
//   console.log("User auth connected to Mongo!");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("User auth IS NOT connected to Mongo!");
// });

// let mongoURI = "mongodb://mongo:27017/user";
// mongoose.connect(mongoURI, options);

const serverStart = (app: Application) => {
    // App configuration
    app.use(cors());
    app.use(cookieParser(config.get("COOKIE_SECRET")));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
        session({
            rolling: true,
            resave: true,
            saveUninitialized: false,
            secret: config.get("COOKIE_SECRET"),
            cookie: { maxAge: COOKIE_EXPIRY, secure: false }
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // Initialize Passport
    // authenticator(app, passport);

    // Initialize Routes
    routes(app);
    // app.use("/auth/login", (req: Request, res: Response, next: NextFunction) => {
    //     console.log(req.body);
    //     res.status(200).send({ data: "user auth" });
    // });

    // Start server
    app.listen(PORT, () => console.log("Listening on port " + PORT));
};

serverStart(express());
