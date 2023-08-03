import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageForm from '../components/MessageForm'

const Chat = () => {
  return (
    <div className='bg-[#FFF4E0] w-full h-full flex justify-center items-center'>
      <div className='grid grid-cols-12 gap-4 w-full md:w-5/6 bg-[#FFBF9B] h-full border border-2 border-[#FFBF9B]'>
        <div className='col-span-4'>
          <Sidebar />
        </div>
        <div className='col-span-8 bg-[#FFF4E0]'>
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default Chat
