import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));

    console.log(decoded);

    
    const { sub, name, picture} = decoded;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true})
    })

  };

  return (
    <div className='flex justify-start items-center flex-col h-screen '>
      <div className='relative w-full h-full'>
        <video 
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          className='w-full h-full object-cover'
        />
      
      <div className='absolute flex flex-col justify-center items-center top-0 left-0 bottom-0 right-0 bg-blackOverlay'>
        <div className='p-5'>
          <img src={logo} width="130px" alt="logo" />
        </div>

        <div className=''>
          <GoogleLogin 
            // clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            // render={(renderProps) => (
            //   <button 
            //     className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     >
            //     <FcGoogle className="mr-4" />Sign in with Google
            //   </button>
            // )}
            no-referrer-when-downgrade
            onSuccess={responseGoogle}
            onError={responseGoogle}
          />
        </div>
      </div>
      </div>

    </div>
  )
}

export default Login