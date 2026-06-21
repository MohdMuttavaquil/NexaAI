import express from 'express'
import { chat, chatHistory, messageHistory } from '../conotrollers/ChatConotroller.js'
import authMiddleware from '../middelwear/Auth.js'

const chatRoute = express.Router()

chatRoute.post('/', authMiddleware, chat)
chatRoute.get('/history', authMiddleware, chatHistory)
chatRoute.post('/messages', messageHistory)

export default chatRoute        