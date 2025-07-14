import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { User } from "./users.model";

export interface Point {
    point: number,
    user: String | ObjectId | User,
}

const Point = new Schema<Point>({
    point: { type: Number, required: true },
    user: { type: Types.ObjectId, required: true }
}, {timestamps: true})
const PointModel = mongoose.model('points', Point)
export default PointModel