import mongoose, { Schema } from "mongoose";

export interface Users {
    password: string,
    username: string,
}

const User = new Schema<Users>({
    password: { type: String, required: true, select: false },
    username: { type: String, required: true, unique: true }
}, {timestamps: true})
const UserModel = mongoose.model('users', User)
export default UserModel