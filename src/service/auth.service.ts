import UserModel, { User } from "../model/users.model";
import { comparePassword, generateToken, hashPassword } from "../middleware/auth.middleware";


export class AuthService {
    async register(data: User) {
        try {
            if(!data.username || !data.password) {
                return { message: 'all fields are required' }
            }
            const existing = await UserModel.findOne({ username: data.username })

            if(existing) {
                return {
                    message: "user already exist"
                }
            }

            const result = await UserModel.create({ username: data.username, password: await hashPassword(data.password)})
            return {
                message: "Registered Successfully",
                user_info: result
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    async login(data: User) {
        try {
            if(!data.username || !data.password) {
                return { message: 'all fields are required' }
            }
            const checkExist = await UserModel.findOne({ username: data.username }).select('+password')
            if(!checkExist) {
                return {
                    message: "user does not exsit"
                }
            }
            const isMatch = await comparePassword(data.password, checkExist.password)
            if(isMatch) {
                const token = generateToken({
                    userId: checkExist._id,
                    username: checkExist.username
                })
                return {
                    message: "Login successfully",
                    user: checkExist,
                    token
                }
            }
            return {
                "message": "invalid password"
            }
        } catch (err: any) {
            console.log(err)
        }
    }


    async getProfile(username: string) {
        try {
            const result = await UserModel.findOne({ username: username })
            return result;
        } catch (err: any) {
            console.log(err)
        }
    }
}