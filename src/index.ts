import { Hono } from 'hono'
import { connectToDB } from '../lib/databaseConnect'
import { serve } from '@hono/node-server'
import userRouter from './router/users.router'

const app = new Hono()
connectToDB()


app.route('/users', userRouter)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
