import express from "express";
import passport from "passport";

// Constants
const router = express.Router();

// Initialize
function logout(passport: any) {
    router.get("/", (req, res) => {
        // @ts-ignore
        if (req.isAuthenticated()) {
            // @ts-ignore
            req.session.destroy();
            // @ts-ignore
            req.logout();
            res.redirect("/");
        }
    });

    return { path: "/logout", router };
}

export default logout(passport);
