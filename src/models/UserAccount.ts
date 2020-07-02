import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const UserAccount = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String },
        salt: { type: String },
        hash: { type: String }
    },
    { collection: "UserAccounts" }
);

UserAccount.plugin(passportLocalMongoose);

export default mongoose.model("UserAccountSchema", UserAccount);
