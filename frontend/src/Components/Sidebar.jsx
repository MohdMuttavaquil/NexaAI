import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LuLogOut, LuTrash2 } from 'react-icons/lu'
import { AppContext } from '../Context/StoreContext'
import { authtication } from '../utile/Helper'

const Sidebar = () => {

  const [titles, setTitles] = useState([])
  const navigate = useNavigate()
  const { userInfo, setUserInfo, setChat, setTitleId, titleId, url } = useContext(AppContext)

  useEffect(() => {
    fetchTitles()
    getUserInfo()
  }, [])

  const fetchTitles = async () => {
    const res = await axios.get(`${url}/chat/history`, { withCredentials: true })
    setTitles(res.data)
  }

  const getUserInfo = async () => {
    const res = await authtication()
    setUserInfo(res.email)
  }

  const logout = async () => {

    const res = await axios.post(`${url}/user/logout`, {}, {
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
    const res = await axios.post(`${url}/chat/messages`, { titleId: id }, { withCredentials: true })
    setChat(res.data)
  }

  const deleteChat = async (id) => {
    await axios.post(`${url}/chat/delete`, { id: id }, { withCredentials: true })
    clearChat()
  }

  return (
    <div className='bg-gray-900 rounded text-white min-h-screen lg:w-[20%] flex flex-col justify-between'>

      <div className='mt-[20vh]'>
        <button onClick={() => clearChat()} className='bg-blue-400 py-1.5 px-3 rounded-xl cursor-pointer text-white text-xl font-semibold ml-6'>New Chat</button>
      </div>

      <p className='pl-6 text-xl font-semibold my-2'>Reacnt</p>

      <div className='pl-6 sidebar h-[50vh] overflow-y-auto flex flex-col gap-0.5'>
        {titles.map((i) => <div key={i._id} className='flex justify-between cursor-pointer hover:bg-black py-1 px-2 rounded-xl'>
          <p className='flex-1' onClick={() => chatPage(i._id)}>{i.title}</p>

          <div onClick={() => deleteChat(i._id)} className='cursor-pointer w-fit'>  <LuTrash2 size={18} color='red' /></div>

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