import { Hono } from "hono";
import { UserService } from "../service/user.service";
import { User } from "../model/users.model";
const userRouter = new Hono()

const userService = new UserService()

userRouter.get('/', async (context) => {
    const result = await userService.getAll()
    return context.json(result)
})

userRouter.post('/', async (context) => {
    const user: User = await context.req.json()
    const result = await userService.createOne(user)
    return context.json(result)
})

userRouter.post('/login', async (c) => {
    const data: User = await c.req.json()
    return c.json(await userService.logUser(data))
})

userRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    return c.json(await userService.getOne(id))
})

userRouter.patch('/:id', async (c) => {
    const id = c.req.param('id')
    const data: User = await c.req.json()
    return c.json(await userService.updateOne(id, data))
})

userRouter.patch('/:id/update-password', async (c) => {
    const id = c.req.param('id')
    const data = await c.req.json()
    console.log(data)
    return c.json(await userService.updatePassword(id, data))
})

userRouter.delete('/:id', async (c) => {
    const user_id = c.req.param('id')
    const result = await userService.deleteOne(user_id)
    return c.json(result)
})



export default userRouter
