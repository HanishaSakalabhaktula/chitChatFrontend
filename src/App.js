import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useSelector } from 'react-redux'
import { AppContext , socket} from './Context/appcontext'
import Edit from './pages/Edit'


const App = () => {
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.user)
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [curRoom, setCurRoom] = useState([]);

  return (
    <AppContext.Provider value={{ socket, members, setMembers, messages, setMessages, newMessages, setNewMessages, privateMemberMsg, setPrivateMemberMsg, curRoom, setCurRoom, rooms, setRooms}}>
      <BrowserRouter>
        <div className='w-screen h-screen bg-[#FFF4E0]'>
        <div className='w-screen h-1/6'>
          <Navbar />
        </div>
        <div className='w-full h-5/6'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/edit' element={<Edit />} />
          {
            !user && (
              <>
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
              </>
            )
            
          }
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
