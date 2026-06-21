import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Singin from "./Pages/Singin"
import Chat from './Pages/Chat'


function App() {


  return (
    <div className='bg-gray-800 text-white min-h-screen'>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App
