import ActivityModel, { Activity } from "../model/activity.model";

export class ActivityService {

    async createActivity(data: Activity) {
        try {
            const result = await ActivityModel.create(data)
            return result
        } catch (err: any) {
            console.log(err)
        }
    }

    async getOneActivity(id: string) {
        try {
            const result = await ActivityModel.findById(id)
            if(!result) {
                return {
                    message: "Activity doesn't exist"
                }
            }
            return result
        } catch (err: any) {
            console.log(err)
        }
    }

}