import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogoutUserMutation } from '../services/appApi';
import { AppContext } from '../Context/appcontext';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser, {isLoading, error}] = useLogoutUserMutation();
  const {socket, setMembers} = useContext(AppContext);
  socket.off('new-user').on('new-user', (payload) => {
    // console.log(payload);
    setMembers(payload);
  })

  useEffect(() => {
    if(user){
      socket.emit('new-user')
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);

    //redirecting to homepage 
    window.location.replace('/');
  }


  return (
    <div className='w-full p-3 bg-[#FFBF9B] shadow-lg flex justify-between'>
        <div>
            <Link to='/' className='text-xl text-[#B46060] font-bold'>Chit-Chat</Link>
        </div>
        <div className='flex justify-center items-center'>
            {
              !user && <Link to='/login' className='text-[#B46060] font-bold hover:underline hover:underline-offset-8 mx-2'>Login</Link>
            }
            {
              user && <Link to='/edit'><img src={user.picture} alt="user-image" style={{width: "30px", height: "30px", margin: "10px", objectFit: "cover", borderRadius: "50%"}} /></Link>
            }
            {
              user && <Link to='/logout' className='text-[#B46060] font-bold hover:underline hover:underline-offset-8 mx-2' onClick={handleLogout}>Logout</Link>
            }
            <Link to='/signup' className='text-[#B46060] font-bold hover:underline hover:underline-offset-8 mx-2'>Sign up</Link>
        </div>
    </div>
  )
}

export default Navbar
