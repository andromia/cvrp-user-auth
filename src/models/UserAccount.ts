import mongoose, { Model, MongooseDocument } from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;
const HASH_ROUNDS = 10;

interface UserAcc extends MongooseDocument {
    username: string;
    email: string;
    password: string;
}

const UserAccount = new Schema(
    {
        email: { type: String, minlength: 8, maxlength: 32, required: true, lowercase: true, trim: true, index: { unique: true } },
        username: { type: String, minlength: 8, maxlength: 32, required: true },
        password: { type: String, required: true }
    },
    { collection: "UserAccounts" }
);

UserAccount.pre("save", function (next) {
    let user = <UserAcc>(<unknown>this);

    if (!this.isModified("password")) return next();

    bcrypt.genSalt(HASH_ROUNDS, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserAccount.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
};

export default mongoose.model("UserAccountSchema", UserAccount);
