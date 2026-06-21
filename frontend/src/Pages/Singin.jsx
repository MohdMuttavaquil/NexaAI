import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuX } from "react-icons/lu"

const Singin = () => {

  const [data, setDate] = useState({
    email: '',
    password: ''
  })
  const [login, setLogin] = useState(true)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDate((prev) => ({ ...prev, [name]: value }))
  }

  const checkRes = (res) => {
    if (res.data.success == true) {
      navigate('/chat')
    } else {
      alert(res.data.message)
    }
  }

  const loginApi = async () => {
    const res = await axios.post('http://localhost:3000/user/login', data, {
      withCredentials: true
    })
    checkRes(res)
  }

  const singinApi = async () => {
    const res = await axios.post('http://localhost:3000/user/singin', data, {
      withCredentials: true
    })
    checkRes(res)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    { login ? loginApi() : singinApi() }
  }


  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>

      <div className='flex justify-between my-2 xl:min-w-[20%] md:min-w-[27%] items-center'>
        <p className='text-2xl font-semibold'>{login ? "Login" : "Singup"}</p>
        <Link to={'/'} className='text-3xl font-semibold cursor-pointer'><LuX /></Link>
      </div>

      <form className='flex flex-col gap-2 xl:min-w-[20%] md:min-w-[27%]' onSubmit={handleSubmit}>

        <input type='email' name='email' value={data.email} onChange={(e) => handleChange(e)} placeholder='Email' required className='outline-none rounded-2xl px-2 border-b-white border-b-2 py-2' />

        <input type='password' name='password' value={data.password} onChange={(e) => handleChange(e)} placeholder='Password' required className='outline-none rounded-2xl px-2 border-b-white border-b-2 py-2' />

        <button type='submit' className='bg-amber-600 text-white rounded-xl px-3 py-1 cursor-pointer hover:bg-amber-800 my-4'>{login ? "Login" : "Singup"}</button>

        <div>
          {login ? <p>If You did not have account <span onClick={() => setLogin(false)} className='text-blue-500 mx-0.5 cursor-pointer'>Create Account</span></p> :
            <p>If You have account <span onClick={() => setLogin(true)} className='text-blue-500 mx-0.5 cursor-pointer'>Login</span></p>}
        </div>

      </form>

    </div>
  )
}

export default Singin