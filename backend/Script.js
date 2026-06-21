import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import chatRoute from './routes/ChatRoute.js'
import connect from './config/DbConfig.js'
import userRoute from './routes/UserRoute.js'
import cookieParser from "cookie-parser";


const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

connect()

app.use('/chat', chatRoute)
app.use('/user', userRoute)


app.get('/', (req, res)=>{
    res.json('server is live')
})


app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})