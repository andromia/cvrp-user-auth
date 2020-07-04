import express, { Application } from "express";
import passport from "passport";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function login(UserAccount: any, passport: any) {
    router.post("/", passport.authenticate("local"), (req, res) => {
        const { email, password } = req.body;

        if (!password) {
            return res.status(400).send({ message: "Please input a password." });
        }

        return res.status(200).send({ message: "Logged In." });
    });

    return { path: "/login", router };
}

export default login(UserAccount, passport);
