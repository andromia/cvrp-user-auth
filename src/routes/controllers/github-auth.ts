import express, { Application } from "express";
import passport from "passport";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function githubAuth(UserAccount: any, passport: any) {
    router.get("/", passport.authenticate("github", { scope: ["user", "user:email"] }), function (req, res) {
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

    router.get("/callback", passport.authenticate("github", { failureRedirect: "/auth/github/failed" }), function (req, res) {
        // return res.redirect("http://localhost:3000/auth/login?requestEmail=true&type=github");
        return res.redirect("http://localhost:3000/apps");
    });

    return { path: "/github", router };
}

export default githubAuth(UserAccount, passport);
