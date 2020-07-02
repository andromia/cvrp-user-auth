import express, { Application } from "express";
import passport from "passport";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send({ data: "hello" });
    // Account.register(new Account({ username: req.body.username }), req.body.password, (err: any, account) => {
    //     if (err) {
    //         return res.render("register", { error: err.message });
    //     }

    //     passport.authenticate("local")(req, res, () => {
    //         req.session.save((err: any) => {
    //             if (err) {
    //                 return next(err);
    //             }
    //             res.redirect("/");
    //         });
    //     });
    // });
});

export default { path: "/register", router };
