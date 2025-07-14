import PointModel from "../model/points.model"
import UserModel from "../model/users.model"

export class PointService {


    async createInitialPoints(user_id: string) {
        try {
            console.log(user_id)
            const user = await UserModel.findOne({ _id: user_id })
            if(!user) {
                return {
                    message: "user doesn't exist"
                }
            }
            const initialPoint = await PointModel.create({ point: 0, user: user_id })
            return initialPoint
        } catch (err: any) {
            console.log(err)
        }
    }

    async insertPoint(username: string) {
        try {

            const user = await UserModel.findOne({ username: username })
            if(!user) {
                return {
                    message: "user doesn't exist"
                }
            }
            const currentPoints = await PointModel.findOne({ user: user._id })
            if(!currentPoints) {
                return {
                    message: "not found"
                }
            }
            const updatedPoints = currentPoints?.point! + 30
            console.log(updatedPoints)
            await PointModel.updateOne({ user: user._id }, { point: updatedPoints })
            return {
                message: "pointed updated successfully"
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    async deductPoint(username: string) {
        try {
            const user = await UserModel.findOne({ username: username})
            if(!user) {
                return {
                    message: "user does not exist"
                }
            }
            const currentPoints = await PointModel.findOne({ user: user._id })
            const updatedPoints = currentPoints?.point! - 30 
            await PointModel.updateOne({ user: user._id }, { point: updatedPoints })
            return {
                message: "point updated successfully"
            }
        } catch (err: any) {
            console.log(err)
        }
    }
}