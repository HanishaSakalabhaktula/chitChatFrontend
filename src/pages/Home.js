import React from 'react'
import { Link } from 'react-router-dom'
import {BsFillChatFill} from 'react-icons/bs'

const Home = () => {
  return (
    <div className='w-full h-full bg-[#FFF4E0] text-[#4D4D4D] flex justify-center items-center p-4'>
        <div className="w-3/4 h-3/4">
            <div className="text-xl md:text-4xl">Let's CHIT-CHAT</div>
            <div className="text-xl">Connect to the world!!</div>
            <Link to='chat'>
                <button className='flex justify-center items-center my-2 p-2 rounded rounded-lg bg-[#4D4D4D] text-[#FFF4E0]'>Get Started <BsFillChatFill className='mx-1'/></button>
            </Link>
        </div>
    </div>
  )
}

export default Home
