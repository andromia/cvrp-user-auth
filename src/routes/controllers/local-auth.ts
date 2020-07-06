import express, { Application } from "express";
import passport from "passport";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function localAuth(UserAccount: any, passport: any) {
    router.post("/register", (req, res) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send({ message: "Missing input data." });
        }

        const newUser = new UserAccount({ email, username, password, createdBy: "local" });

        UserAccount.findOne({ email }, (err, userDoc) => {
            if (err) return res.status(400).send({ message: err });
            if (userDoc) return res.status(400).send({ message: "Email already taken." });

            newUser.save((err, newUserDoc) => {
                if (err) return res.status(400).send({ message: err });

                passport.authenticate("local")(req, res, () => {
                    req.session.save(err => {
                        return res.status(200).send({ message: "Successfully registered." });
                    });
                });
            });
        });
    });

    router.post("/login", passport.authenticate("local", { failureRedirect: "/auth/local/failed" }), (req, res) => {
        const { email, password } = req.body;

        if (!password) {
            return res.status(400).send({ message: "Please input a password." });
        }

        return res.status(200).send({ message: "Successfully logged in." });
    });

    router.get("/verify", (req, res) => {
        // @ts-ignore
        if (req.isAuthenticated()) {
            return res.status(200).send({ message: "User is authenticated." });
        } else {
            return res.status(401).send({ message: "User is not authenticated." });
        }
    });

    router.get("/failed", (req, res) => {
        // @ts-ignore
        if (req.isAuthenticated()) {
            // @ts-ignore
            req.session.destroy();
            // @ts-ignore
            req.logout();
        }

        return res.status(401).send({ message: "User is not authenticated." });
    });

    return { path: "/local", router };
}

export default localAuth(UserAccount, passport);
