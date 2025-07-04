import { Hono } from 'hono'
import { connectToDB } from '../lib/databaseConnect'
import { serve } from '@hono/node-server'
import userRouter from './router/users.router'
import { cors } from 'hono/cors'
import authRouter from './router/auth.router'
import { JWTPayload } from 'hono/utils/jwt/types'

connectToDB()

type Variables = {
  user: JWTPayload
}

const app = new Hono<{ Variables: Variables }>()

app.use('*', cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))

app.route('/users', userRouter)
app.route('/auth', authRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
