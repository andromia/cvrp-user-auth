import express, { Application } from "express";
const LocalStrategy = require("passport-local").Strategy;

// Local Imports
import UserAccount from "models/UserAccount";

export default (app: Application, passport: any) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    const registerStrategy = new LocalStrategy(function (username, password, done) {
        UserAccount.findOne(username, function (err, user: any) {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!user.verifyPassword(password)) return done(null, false);
            return done(null, user);
        });
    });

    passport.use(registerStrategy);
};
