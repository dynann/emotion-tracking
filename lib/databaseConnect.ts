import mongoose from "mongoose"
import "dotenv/config"

export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || "").then(
            () => console.log("database connected")
        )
    } catch (err: any) {
        console.log(`error connect to database: ${err}`)
    }

}