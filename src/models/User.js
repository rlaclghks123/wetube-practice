import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    socialOnly: { type: Boolean },
    name: { type: String, required: true },
    password: { type: String },
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})
const User = mongoose.model("User", userSchema);

export default User;