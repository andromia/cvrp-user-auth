import express, { Application } from "express";
import config from "config";

const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Local Imports
import UserAccount from "models/UserAccount";

export default (app: Application, passport: any) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    const registerStrategy = new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        function (req, username, password, done) {
            UserAccount.findOne({ email: req.body.email }, function (err, user: any) {
                if (err) return done(err);
                if (!user) return done(null, false);

                user.comparePassword(password, (err, isMatch) => {
                    if (err || !isMatch) return done(null, false);

                    return done(null, user);
                });
            });
        }
    );

    const gitHubStrategy = new GitHubStrategy(
        {
            clientID: config.get("GITHUB_CLIENT_ID"),
            clientSecret: config.get("GITHUB_CLIENT_SECRET"),
            callbackURL: "http://localhost:8080/auth/github/callback/"
        },
        function (accessToken, refreshToken, profile, done) {
            UserAccount.findOne({ githubId: profile.id }, function (err, user) {
                if (err) return done(err, null);
                if (user) return done(null, user);

                let tmpEmail = profile.id + "@temporary_email.com";
                const newUserAccount = new UserAccount({
                    email: tmpEmail,
                    username: profile.username,
                    createdBy: "github",
                    githubId: profile.id
                });

                return newUserAccount.save((err, doc) => {
                    return done(null, doc);
                });
            });
        }
    );

    const googleStrategy = new GoogleStrategy({
        clientID: config.get("GOOGLE_CLIENT_ID"),
        clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        UserAccount.findOne({ googleId: profile.id }, function (err, user) { // was findOrCreate
            return cb(err, user);
            });
        }
    );

    passport.use(registerStrategy);
    passport.use(gitHubStrategy);
    passport.use(googleStrategy);
};
