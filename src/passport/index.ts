import express, { Application } from "express";
const LocalStrategy = require("passport-local").Strategy;

export default (app: Application, passport: any) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // const strategy = new LocalStrategy(function (username, password, done) {
    //     User.findOne({ username: username }, function (err, user) {
    //         if (err) {
    //             return done(err);
    //         }
    //         if (!user) {
    //             return done(null, false);
    //         }
    //         if (!user.verifyPassword(password)) {
    //             return done(null, false);
    //         }
    //         return done(null, user);
    //     });
    // });

    // passport.use(strategy);
};
