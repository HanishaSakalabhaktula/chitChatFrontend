import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {BiSolidImageAdd} from 'react-icons/bi'
import { useSignupUserMutation } from '../services/appApi';
import { AppContext } from '../Context/appcontext';

const Signup = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [file, setFile] = useState();
    const [error, setError] = useState();
    const [uploadingfile, setUploadingFile] = useState(false);
    const [imagepreview, setImagePreview] = useState(null);
    const [signupUser, {isLoading, err }] = useSignupUserMutation();

    const { socket } = useContext(AppContext);
    const navigate  = useNavigate();

    //validating image
    const validateImg = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setImagePreview(URL.createObjectURL(f));
    }

    //uploading an image
    const uploadImage = async () => {
        //uploading image to a cloudinary
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'gufgbj2n');

        try {
            setUploadingFile(true);
            let res = await fetch('https://api.cloudinary.com/v1_1/dglk4g6la/image/upload', {
                method: 'post',
                body: data
            })

            const urlData = await res.json();
            setUploadingFile(false);
            return urlData.url;
        } catch (e) {
            console.log(e);
        }
    }

    //on submiting the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!file){
            return alert('Please upload your profile picture');
        }
        const url = await uploadImage();
        
        if(!name || !email || !password){
            return alert('All Fields mandatory !')
        }else{
            //sign up the user
            signupUser({name, email, password, picture: url})
                .then((data) => {
                    if(data){
                        // console.log(data);
                        socket.emit('new-user');
                        navigate('/chat');
                    }
                })
        }
    }
  return (
    <div className='w-full h-full flex justify-center items-center bg-[#FFF4E0]'>
      <div className="w-3/4 md:w-1/2 h-3/4">
        <form className='w-full p-4 bg-[#FFBF9B] rounded-lg' onSubmit={handleSubmit}>
            <div className="text-xl text-center font-bold text-[#4D4D4D]">Sign Up</div>
            <label className="block">
            <span className="w-[80px] flex justify-center items-center my-2 p-2 rounded rounded-full font-medium bg-[#B46060] text-[#FFBF9B]"> <BiSolidImageAdd className='text-3xl'/> Image</span>
            <input type="file" style={{display: "none"}} className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " onChange={validateImg}/>
            </label>
            <label className="block">
            <span className="block my-2 font-medium text-[#4D4D4D]">Username: </span>
            <input type="text" placeholder="Username" className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " onChange={(e) => setName(e.target.value)}/>
        </label>
        <label className="block">
            <span className="block my-2 font-medium text-[#4D4D4D]">Email: </span>
            <input type="email" placeholder="Email" className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label className="block">
            <span className="block my-2 font-medium text-[#4D4D4D]">Password</span>
            <input type="password" placeholder="Password" className="mt-1 block w-full px-3 py-2 bg-none border border-[#FFBF9B] rounded-md text-sm shadow-sm placeholder-[#4D4D4D]
            focus:outline-none focus:border-[#FFBF9B] focus:border-[#B46060]
            " onChange={(e) => setPassword(e.target.value)}/>
        </label>

        <button className='mt-4 py-1 px-3 rounded-lg text-[#FFF4E0] font-bold bg-[#B46060]'>{uploadingfile ? "Signing you...": "Sign up"}</button>
            <div className='text-sm font-semibold text-[#B46060]'>Already have an account? <Link to='/login'>Log in</Link></div>
        {
            error && <div>{error}</div>
        }
        </form>
      </div>
    </div>
  )
}

export default Signup
