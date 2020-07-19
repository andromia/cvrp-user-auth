import express, { Application } from "express";
import passport from "passport";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function googleAuth(UserAccount: any, passport: any) {
    router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

    router.get(
        '/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return { path: "/google", router };
}

export default googleAuth(UserAccount, passport);
