import React, { useState, useContext } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { LuSend } from "react-icons/lu"
import { ImSpinner2 } from "react-icons/im"
import { AppContext } from '../Context/StoreContext'

const Chat = () => {

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const  { titleId, setTitleId, chat, setChat, url } = useContext(AppContext)
    const navigate = useNavigate()

    const show = () => {
        const data = { type: 'q', message: message }
        setChat(prev => [...prev, data])
        setMessage('')
        chatApi()
    }

    const chatApi = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${url}/chat`, { message: message, titleId: titleId }, { withCredentials: true })
            console.log(res.data)
            const data = { type: 'a', message: res.data.text }
            setTitleId(res.data.titleId)
            setChat(prev => [...prev, data])

        } catch (error) {
            console.log(error)
            if (!error.response.data.success) {
                alert('login again')
                navigate('/singin')
            }
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div>

            <div className='min-h-screen text-white flex'>

                <Sidebar />

                <div className='flex-1'>

                    <div className='h-[90vh] w-[85%] mx-auto pt-16 overflow-y-scroll sidebar' >
                        {chat && chat.map((item, index) => <div key={index} className={`${item.type === 'q' ? "text-right" : "text-left"} my-8 md:mx-10 mx-2`}>

                            <div className={`${item.type === 'q' ? "bg-black px-4 py-1.5 rounded-xl" : ""} inline-block`}>
                                <ReactMarkdown>
                                    {item.message}
                                </ReactMarkdown>
                            </div>

                        </div>)}

                        <div className={`w-[85%] mx-auto ${isLoading ? "flex" : "hidden"}`}><ImSpinner2 className='animate-spin' /> </div>
                    </div>


                    <div className='my-2 flex justify-center gap-2'>

                        <input type='text' value={message} placeholder='how can i help you today' onChange={(e) => setMessage(e.target.value)} className='outline-none rounded-2xl px-2 border-b-white border-b-2 md:w-[60%] py-2' />

                        <button onClick={() => show()} className='py-2 bg-black px-3 rounded-2xl cursor-pointer '><LuSend /></button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Chat