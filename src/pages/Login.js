import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../services/appApi';
import { AppContext } from '../Context/appcontext';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();

    const {socket} = useContext(AppContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            return alert('All fields mandatory !');
        }else{
            //login user
            loginUser({email, password})
              .then((data) => {
                if(data){
                  //socket work
                  socket.emit('new-user');
                  //navigate to the chat page
                  navigate('/chat');
                }
              })
        }
    }
  return (
    <div className='w-full h-full flex justify-center items-center bg-[#FFF4E0]'>
      <div className="w-3/4 md:w-1/2 h-3/4">
        <form className='w-full p-4 bg-[#FFBF9B] rounded-lg' onSubmit={handleSubmit}>
            <div className="text-xl text-center font-bold text-[#4D4D4D]">Login</div>
        <label className="block">
            <span className="block font-medium text-[#4D4D4D]">Email: </span>
            <input type="email" placeholder="Email" className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label className="block">
            <span className="block font-medium text-[#4D4D4D]">Password</span>
            <input type="password" placeholder="Password" className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " required onChange={(e) => setPassword(e.target.value)}/>
        </label>

        <button className='my-2 py-1 px-3 rounded-lg text-[#FFF4E0] font-bold bg-[#B46060]'>Login</button>
        <div className='text-sm font-semibold text-[#B46060]'>Don't have an account? <Link to='/signup'>Sign up</Link></div>

        {
            error && <div>{error}</div>
        }
        </form>
      </div>
    </div>
  )
}

export default Login
