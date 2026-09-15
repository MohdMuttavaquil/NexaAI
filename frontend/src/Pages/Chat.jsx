import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { LuSend } from "react-icons/lu"
import { ImSpinner2 } from "react-icons/im"
import { AppContext } from '../Context/StoreContext'
import { formateChat } from '../utile/Helper'
import { FaUser } from "react-icons/fa"

const Chat = () => {

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [prevChat, setPrevChat] = useState([])

    const { titleId, setTitleId, chat, setChat, url, showSidebar, setShowSidebar } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        const a = formateChat(chat)
        if (a.length == 0) {
            return
        }
        chatApi(a)
    }, [prevChat])

    const show = () => {
        const data = { type: 'q', message: message }
        setChat(prev => [...prev, data])
        setMessage('')
        setPrevChat([...prevChat, 'q'])
    }

    const chatApi = async (history) => {
        try {
            setIsLoading(true)
            const question = history[history.length - 1].parts[0].text

            const res = await axios.post(`${url}/chat`, { message: question, titleId: titleId, question: history }, { withCredentials: true })

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
        <>

            <div className='max-h-screen text-white flex w-full z-40'>

                {/* Sidebar in Dasktop & big screen */}
                <div className='hidden md:flex w-[20%]'>
                    <Sidebar />
                </div>


                {/* Sidebar in Mobile & small screen */}
                <div className={`${showSidebar ? "" : "hidden"} w-[75%] z-50 fixed`}>
                    <Sidebar />
                </div>

                { /* Chat box */}

                <div className='flex-1'>

                    <div className='md:hidden px-6 mt-4'>
                        <FaUser size={20} onClick={() => setShowSidebar(true)} className={`${showSidebar ? "hidden" : ""}`} />
                    </div>

                    <div className='h-[85vh] w-[95%] mx-2 md:mx-auto pt-16 overflow-y-scroll sidebar' >

                        {chat && chat.map((item, index) => <div key={index} className={`${item.type === 'q' ? "text-right" : "text-left"} my-8 md:mx-10 mx-2`}>

                            <div className={`${item.type === 'q' ? "bg-black px-4 py-1.5 rounded-xl" : ""} inline-block`}>
                                <ReactMarkdown>
                                    {item.message}
                                </ReactMarkdown>
                            </div>

                        </div>)}

                        <div className={`w-[85%] mx-auto ${isLoading ? "flex" : "hidden"}`}><ImSpinner2 className='animate-spin' />
                        </div>

                    </div>

                    {/* input and Submit button */}

                    <form className='my-2 flex justify-center gap-2 mx-auto'>

                        <input type='text' value={message} placeholder='how can i help you today' onChange={(e) => setMessage(e.target.value)} className='outline-none rounded-2xl px-2 border-b-white border-b-2 md:w-[60%] w-[80%] py-2' required />

                        <button type='submit' disabled={isLoading} onClick={() => show()} className='py-2 bg-black px-3 rounded-2xl cursor-pointer'><LuSend /> </button>
                    </form>

                </div>

            </div>

        </>
    )
}

export default Chat