import express, { Application } from "express";
import passport from "passport";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function register(passport: any, UserAccount: any) {
    router.post("/", (req, res) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send({ message: "Missing input data." });
        }

        UserAccount.register(new UserAccount({ username, email }), password, (err: any, account) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }

            passport.authenticate("local")(req, res, () => {
                req.session.save((err: any) => {
                    if (err) {
                        return res.status(400).send({ error: err.message });
                    }
                    res.redirect("/dashboard");
                });
            });
        });
    });

    return { path: "/register", router };
}

export default register(passport, UserAccount);
