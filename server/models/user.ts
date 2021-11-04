import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt';

//collection of users after reciving data considered for login
const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    displayName: String
}, {
    collection: 'users'
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});

//method for validation of the hash
UserSchema.methods.isValidPassword = async function (password: string) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
}
declare global {
    export type UserDocument = mongoose.Document & {
        _id: String,
        email: String,
        username: String,
        password: String,
        displayName: String
    }
}

const Model = mongoose.model('User', UserSchema);

export default Model;