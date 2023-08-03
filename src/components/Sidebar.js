import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../Context/appcontext';
import { addNotifications, resetNotifications } from '../features/userSlice';

const Sidebar = () => {

  // const rooms = ['first room', 'second room'];
  const user = useSelector((state) => state.user);
  const {socket, members, setMembers, rooms, setRooms, privateMemberMsg, setPrivateMemberMsg, curRoom, setCurRoom} = useContext(AppContext);
  const dispatch = useDispatch();

  const joinRoom = (room, isPublic = true) => {
    if(!user){
      return alert("Please Login");
    }

    socket.emit("join-room", room);
    setCurRoom(room);
    if(isPublic){
      setPrivateMemberMsg(null);
    }

    //dispatch notifications
  //   dispatch(resetNotifications[room]);
  // socket.off('notifications').on('notifications', (room) => {
  //   dispatch(addNotifications[room]);
  // });
}

  useEffect(() => {
    if(user){
      setCurRoom('Dark Arts');
      getRooms();
      socket.emit('join-room', "Dark Arts");
      socket.emit('new-user')
    }
  }, []);

  socket.off('new-user').on('new-user', (payload) => {
    // console.log(payload);
    setMembers(payload);
  })

  const orderIds = (id1, id2) => {
    if(id1 > id2){
      return id1 + '-' + id2;
    }

    return id2 + '-' + id1;
  }
  const handlePrivateMemberMsg = (member) => {
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }
  function getRooms(){
    fetch('http://localhost:5000/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  if(!user){
    return <></>
  }
  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-1 text-[#B46060]'>
      <h2 className='text-xl text-center font-semibold'>Members</h2>
      <div className='w-full p-0 mt-4'>
        <h2 className='font-bold text-lg text-center'>Rooms</h2>
        {
          rooms.map((room, idx) => (
            <div key={idx} className='w-full p-2 border-l-8 cursor-pointer my-1 bg-[#FFF4E0] border-[#FFBFF9B] active:bg-[#B46060] active:text-[#FFF4E0]' onClick={() => joinRoom(room)} active={room == curRoom}>
              {room} {curRoom !== room && <span></span>}
            </div>
          ))
        }
      </div>
      
      <div className='w-full p-0 mt-4 h-3/4'>
      <h2 className='font-bold text-lg text-center'>Members</h2>
      <div className='w-full h-64 py-2 overflow-y-scroll scrollbar-thin'>
      {
        members.map((m) => (
          <div key={m._id} className='w-full border-l-8 cursor-pointer my-1 border-[#FFBF9B] active:bg-[#B46060] active:text-[#FFF4E0]' active={privateMemberMsg?._id === m?._id} onClick={()=>handlePrivateMemberMsg(m)} aria-disabled={m._id === user._id}>
              <div className={m._id == user._id ? 'w-full bg-[#FFD6A5] grid grid-cols-12 gap-2' : 'w-full bg-[#FFF4E0] grid grid-cols-12 gap-2'}>
                <div className='col-span-2'>
                  <img src={m.picture} alt="profile" style={{width: "30px", height: "30px", margin: "10px", objectFit: "cover", borderRadius: "50%"}}/>
                </div>
                <div className="col-span-6 ml-4">
                  <div>{m.name}</div>
                  <div>{m.status}</div>
                </div>
                {/* <div className="col-span-2">
                  {user.newMessages[orderIds(m._id, user._id)]}
                </div> */}
              </div>
          </div>
        ))
      }
      </div>
      </div>
    </div>
  )
}

export default Sidebar
