import express, { Application } from "express";

// Local Imports
import UserAccount from "models/UserAccount";

// Constants
const router = express.Router();

// Initialize
function register(UserAccount: any) {
    router.post("/", (req, res) => {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).send({ message: "Missing input data." });
        }

        const newUser = new UserAccount({ email, username, password });

        UserAccount.findOne({ email }, (err, userDoc) => {
            if (err) return res.status(400).send({ message: err });
            if (userDoc) return res.status(400).send({ message: "Email already taken." });

            newUser.save((err, newUserDoc) => {
                if (err) return res.status(400).send({ message: err });

                res.redirect("/login");
            });
        });
    });

    return { path: "/register", router };
}

export default register(UserAccount);
