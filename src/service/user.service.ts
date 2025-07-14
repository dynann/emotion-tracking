import UserModel, { User } from "../model/users.model";
import * as bcrypt from "bcrypt"
export class UserService {

    async getOne(id: string) {
        try {
            const user = await UserModel.findById(id)
            if(!user) {
                return {
                    "message": "user does not exist"
                }
            }
            return user
        } catch (err: any) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            const users = await UserModel.find()
            if(users.length === 0) {
                return {
                    "list": [],
                    "total": 0,
                }
            }
            return {
                "list": users,
                "total": users.length,
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    async createOne(user: User) {
        try {
            if(!user.password || !user.username) {
                const missingValue = !user.password ? "password required" : "username required"
                return {
                    "message": missingValue
                }
            }
            const existing = await UserModel.findOne({ username: user.username })
            if(existing){
                return {
                    "message": `username: ${existing.username} already exists`
                }
            }
            user.password = await bcrypt.hash(user.password, 10)
            const result = await UserModel.create(user)
            const { password, ...userWithoutPassword } = result.toObject()
            return userWithoutPassword
        } catch (err) {
            console.log(err)
        }
    }

    async updateOne(id: string, data: User) {
        try {
            const user = await UserModel.findById(id)
            if(!user){
                return {
                    "message": "user does not exist"
                }
            }
            await UserModel.findOneAndUpdate({_id: id}, {...data})
            return {
                "message": "update successfully",
                "user": await UserModel.findById(id)
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    async deleteOne(id: string) {
        try {
            const result = await UserModel.deleteOne({_id: id})
            if(!result) {
                return {
                    "message": "user does not exist",
                }
            }
            return {
                "message": result
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    async updatePassword(id: string, data: any) {
        try {
            
            if(!data.newPassword || !data.oldPassword) {
                const message = !data.newPassword ? "new password required" : "old password required"
                return {
                    "message": message
                }
            }
              const user = await UserModel.findById(id).select('+password')
            if(!user) {
                return {
                    "message": "user does not exist"
                }
            }
            if(data.oldPassword === data.newPassword) {
                return {
                    "message": "new password and old password cannot be the same"
                }
            }
            const isCorrect = await bcrypt.compare(data.oldPassword, user.password, )
            if(!isCorrect){
                return {
                    "message": "current password is invalid"
                }
            }
            const updateData = { ...user, password: data.newPassword}
            await UserModel.findOneAndUpdate({ _id: id}, updateData)
            
            return {
                "message": "update successfully",
            }
        } catch (err: any) {
            console.log(err)
        }
    }
    
    async logUser(data: User) {

        try {

            if(!data.username || !data.password) {
                const message = !data.username ? "username required" : "password required"
                return {
                    "message": message
                }
            }
            const user = await UserModel.findOne({ username: data.username }).select('+password')
            if(!user){
                return {
                    "message": `user with this ${data.username} does not exist`
                }
            }
            const isMatch = await (bcrypt.compare(data.password, user.password))
            if( isMatch && (data.username === user.username)) {
                return {
                    "message": "log in successfully"
                }
            } else {
                return {
                    "message": "incorrect credentials"
                }
            }
        } catch (err: any) {
            console.log(err)
        }
    }
}