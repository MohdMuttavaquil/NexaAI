import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'
import userModel from '../modles/UserModel.js'
import titleModel from '../modles/TitleModel.js'
import messageModel from '../modles/messagesModel.js'

const ai = new GoogleGenAI({})
let modelUse = 'gemini-3.5-flash'

const chat = async (req, res) => {
    const question = req.body.message
    let titleId = req.body.titleId

    if (!titleId) {
        const title = question.slice(0, 20)
        const message = { type: 'q', message: question }

        const createdTitle = await titleModel.create({
            userId: req.id,
            title: title
        })

        titleId = createdTitle._id

        await messageModel.create({
            conversationId: titleId,
            message: message
        })
    } else {
        const message = { type: 'q', message: question }
        await messageModel.create({
            conversationId: titleId,
            message: message
        })
    }


    try {
        const responce = await ai.models.generateContent({
            model: modelUse,
            contents: question
        })

        const message = { type: 'a', message: responce.text }
        await messageModel.create({
            conversationId: titleId,
            message: message
        })
        await titleModel.findByIdAndUpdate(titleId, { $set: { updatedAt: new Date() }})
        res.json({ text: responce.text, titleId: titleId })
    } catch (error) {
        console.log(error)
        if (error.status == 503) {
            // modelUse = 'gemini-3.1-flash-lite'
            return res.json({ text: 'please try again', titleId: titleId })
        }
        res.json("APIs error")
    }
}


const chatHistory = async (req, res) => {
    try {
        const responce = await titleModel.find({ userId: req.id }).sort({ updatedAt: -1})
        res.json(responce)

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'server error' })
    }
}

const messageHistory = async (req, res) => {
    const id = req.body.titleId
    
    try {
        const responce = await messageModel.find({ conversationId: id }).select({ message:1, createdAt: 1 }).sort({createdAt: -1}).limit(30)
        let data = []
        responce.map((i)=>{
            data.push(i.message)
        })
        res.json(data.reverse())
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'server error' })
    }
}

export { chat, chatHistory, messageHistory }