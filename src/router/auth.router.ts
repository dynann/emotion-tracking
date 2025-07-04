import { Hono } from "hono";
import { AuthService } from "../service/auth.service";
import { Users } from "../model/users.model";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = new Hono()
const authService = new AuthService()

authRouter.get('/profile', authMiddleware, async (c) => {
    const user = c.get('user')
    const result = await authService.getProfile(user.username)
    return c.json(result)
})

authRouter.post('/login', async (c) => {
    const data: Users = await c.req.json()
    const result = await authService.login(data)
    return c.json(result)
})

authRouter.post('/register', async (c) => {
    const data: Users = await c.req.json()
    const result = await authService.register(data)
    return c.json(result)
})



export default authRouter