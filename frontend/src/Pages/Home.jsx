import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authtication } from '../utile/Helper'
import { AppContext } from '../Context/StoreContext'

const Home = () => {

  useEffect(() => {
    getUserInfo()
  }, [])

  const navigate = useNavigate()
  const { setUserInfo } = useContext(AppContext)

  const getUserInfo = async () => {
    const res = await authtication()
    if (res.success == true) {
      setUserInfo(res.email)
      navigate('/chat')
    }
  }

  return (
    <div className='min-h-[80vh] w-full flex flex-col justify-center items-center gap-0.5'>

      <h1 className='text-3xl font-semibold'>NexaAI</h1>
      <p className='text-2xl font-semibold'>Next-Generation AI Chatbot</p>

      <p className='text-xl font-semibold mt-6'>Ask questions, generate ideas, and get instant help anytime.</p>
      <p className='text-lg font-semibold'>Log in to explore everything this chatbot has to offer. </p>

      <Link to={'/singin'} className='bg-blue-500 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded mt-5'>Login</Link>

    </div>
  )
}

export default Home