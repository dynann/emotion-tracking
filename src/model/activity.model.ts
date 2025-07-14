import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { User } from "./users.model";

export interface Activity {
    reply_time: string,
    user: String | ObjectId | User,
}

const Activity = new Schema<Activity>({
    reply_time: { type: String, required: true, select: false },
    user: { type: Types.ObjectId, required: true }
}, {timestamps: true})
const ActivityModel = mongoose.model('activities', Activity)
export default ActivityModel