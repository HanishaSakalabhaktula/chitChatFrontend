import React, { useContext, useEffect, useRef, useState } from 'react'
import {BiSend} from 'react-icons/bi'
import { AppContext } from '../Context/appcontext';
import { useSelector } from 'react-redux';
const MessageForm = () => {
    const user = useSelector((state) => state.user);
    const [message, setMessage] = useState("");

    const { socket, messages, setMessages, curRoom, setCurRoom } = useContext(AppContext);
    const messageEndRef = useRef(null);
    useEffect(() => {
      scrollToBottom();
    }, [messages])
    const scrollToBottom =() => {
      messageEndRef.current?.scrollIntoView({behaviour: "smooth"})
    }
    const getFormattedDate = () => {
      const date = new Date();

      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      month = month.length > 1 ? month : "0" + month;
      let day = date.getDay().toString();
      day = day.length > 1 ? day : "0" + day;

      return month + "/" + day + "/" + year;
    }

    const todayDate = getFormattedDate();
    socket.off('room-messages').on('room-messages', (roomMessages) => {
      // console.log(roomMessages);
      setMessages(roomMessages);
    })



    const handleSubmit = (e) => {
      e.preventDefault();
      if(!message){
        return;
      }

      const today = new Date();
      let mins = today.getMinutes();
      mins = mins < 10 ? "0" + mins : mins;

      const time = today.getHours() + ":" + mins;
      const roomId = curRoom;
      socket.emit('message-room', roomId, message, user, time, todayDate);
      setMessage("");
  }


  return (
    <div className='relative w-full h-full'>
      <div className='text-center text-xl font-semibold bg-[#FFBF9B] p-2 text-[#B46060]'>All Messages</div>
      {
        !user && <div className='p-2 border border-red-400 bg-red-300 w-full text-red-600 text-xl text-center'>Please Login!!</div>
      }

      <div className='h-[500px] overflow-y-scroll scrollbar-thin scroll-smooth flex flex-col-reverse'>
      {
        user && messages.map(({_id, messagesByDate}, idx) => (
          <div key={idx} className='w-full grid'> 
            <p className='w-full text-center text-[#B46060] bg-[#EFE1D1] py-1'>Date: {_id}</p>
            { 
              messagesByDate?.map(({content, time, from: sender}, idx) => (
                <div key={idx} className={sender?.email === user?.email  ? "bg-[#884A39] m-2 w-fit w-max-1/2 rounded-b-xl rounded-l-xl justify-self-end" : "bg-[#A75D5D] m-2 w-fit rounded-b-xl rounded-l-xl justify-self-start" }>
                  <div className={sender?.email === user?.email  ? "flex items-center py-1 text-[#F9E0BB]" : "flex items-center py-1 text-[#F3DEBA]"}>
                    <img className='mx-2' src={sender.picture} alt="image" style={{width: "25px", height: "25px", objectFit: "cover", borderRadius: "50%"}} />
                    <p className='text-xs'>{sender._id === user?._id ? "YOU" : sender.name}</p>
                  </div>
                  <div className={sender?.email === user?.email  ?  "w-full bg-[#F9E0BB] text-[#884A39] p-2 rounded-b-lg" : "w-full bg-[#F3DEBA] text-[#A75D5D] p-2 rounded-b-lg"}>
                  <div className='my-1'>{content} <span className='ml-1 text-xs'>{time}</span></div>
                  </div>
                </div>
              ))
            }
          </div>
        ))
      }
      </div>
      <div ref={messageEndRef}></div>
      <form onSubmit={handleSubmit} className='absolute bottom-0 w-full'>
        <div className='grid grid-cols-12'>
            <div className="col-span-11">
                <input type="text" disabled={!user} className='w-full border-none bg-none outline-none  text-[#B46060] h-[2.5rem]' value={message} onChange={(e) => setMessage(e.target.value)}/>
            </div>
            <button className="col-span-1 flex justify-center items-center text-[#B46060] bg-[#FFBF9B]" aria-disabled={!user}><BiSend className='font-bold text-xl'/></button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
