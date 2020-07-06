import mongoose from '../core/database'
import { Model } from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        desc: "The user's email address.",
        trim: true,
        type: String,
        index: true,
        unique: true,
        required: true,
      },
    password: {
        desc: "user password",
        trim: true,
        type: String,
        required: true,
        select: false,
    }
});

export interface IUser extends mongoose.Document {
    email: string,
    password: string
}

export class UserModel {
    _id?: string
    email: string
    password: string
    constructor(email: string, password: string, id?: string){
        this._id = id
        this.email = email;
        this.password = password;
    }
}

const User: Model<IUser> = mongoose.model<IUser>("users", UserSchema);

export default User;