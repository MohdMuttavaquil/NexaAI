import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { AppContext } from '../Context/StoreContext'
import { authtication } from '../utile/Helper'

const Sidebar = () => {

  const [titles, setTitles] = useState([])
  const navigate = useNavigate()
  const { userInfo, setUserInfo, setChat, setTitleId, titleId } = useContext(AppContext)

  useEffect(() => {
    fetchTitles()
    getUserInfo()
  }, [])

  const fetchTitles = async () => {
    const res = await axios.get('http://localhost:3000/chat/history', { withCredentials: true })
    setTitles(res.data)
  }

  const getUserInfo = async() =>{
    const res = await authtication()
    setUserInfo(res.email)
  }

  const logout = async () => {

    const res = await axios.post('http://localhost:3000/user/logout', {}, {
      withCredentials: true
    })
    navigate('/')
  }

  const clearChat = () => {
    setChat([])
    setTitleId()
  }

  const chatPage = async (id) => {
    setChat([])
    setTitleId(id)
    const res = await axios.post('http://localhost:3000/chat/messages', { titleId: id }, { withCredentials: true })
    setChat(res.data)
  }

  return (
    <div className='bg-gray-900 rounded text-white min-h-screen lg:w-[20%] flex flex-col justify-between'>

      <div className='mt-[20vh]'>
        <button onClick={() => clearChat()} className='bg-blue-400 py-1.5 px-3 rounded-xl cursor-pointer text-white text-xl font-semibold ml-6'>New Chat</button>
      </div>

      <div className='pl-6 min-h-[50vh]'>
        <p>Reacnt</p>
        {titles.map((i) => <div key={i._id} className='overflow-y-auto flex flex-col gap-0.5'>
          <p onClick={() => chatPage(i._id)} className='cursor-pointer hover:bg-black py-1 pl-2 rounded-xl'>{i.title}</p>
        </div>)}
      </div>

      <div className='my-10 pl-6'>
        <p>{userInfo}</p>
        <button onClick={() => logout()} className='text-red-600 px-3 py-1 bg-gray-900 rounded-xl cursor-pointer my-2 flex items-center gap-1'>Logout <LuLogOut /></button>
      </div>

    </div>
  )
}

export default Sidebar