import { Context, Next } from "hono";
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { JWTPayload } from "hono/utils/jwt/types";
import * as bcrypt from "bcrypt"
import { verify } from "hono/jwt";
dotenv.config()


export const authMiddleware = async (c: Context, next: Next) => {
    try {
        const authHeader = c.req.header('Authorization')

        if(!authHeader || !authHeader.startsWith('Bearer')) {
            return c.json({ message: 'Log In Required' })
        }

        const token = authHeader.split(' ')[1]

        const payload = await verify(token,  "abcdefghijklmno123456789");

        c.set("user", { username: (payload as { username: string }).username });

        await next()

    } catch (err: any) { 
        if(err instanceof jwt.JsonWebTokenError) {
            return c.json({ message: 'Invalid token' }, 401)
        }
        if(err instanceof jwt.TokenExpiredError) {
            return c.json({ message: 'Token expired' }, 401)
        }
        console.log(err)
        return c.json({ message: 'Authentication failed' }, 500)
    }
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp' >): string => {
    return jwt.sign(payload, "abcdefghijklmno123456789", {
        expiresIn: '7d'
    })
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}