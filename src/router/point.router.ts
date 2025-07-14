import { Hono } from "hono";
import { PointService } from "../service/point.service";

const pointRouter = new Hono()
const pointService = new PointService()
pointRouter.post('', async (ctx) => {
    const user_id =  await ctx.req.json()
    console.log(user_id)
    await pointService.createInitialPoints(user_id.user_id)
    return ctx.text('kob sari')
})

export default pointRouter