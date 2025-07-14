import UserModel from '../model/users.model'


export class BotService {
    

    async getLLMCheck() {

    }

    async getUserInfo( username: string ) {
        try {
            const result = await UserModel.findOne({ username: username })
            if(!result) {
                return null
            }
            return result
        } catch (err: any) {
            console.log(err)
        }
    }
}