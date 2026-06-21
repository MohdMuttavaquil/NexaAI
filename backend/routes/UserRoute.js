import express from 'express'
import { check, login, logout, singIn } from '../conotrollers/UserConotroller.js'
import authMiddleware from '../middelwear/Auth.js'

const userRoute = express.Router()

userRoute.post('/login', login)
userRoute.post('/singin', singIn)
userRoute.get('/check', authMiddleware, check)
userRoute.post('/logout', authMiddleware, logout)

export default userRoute