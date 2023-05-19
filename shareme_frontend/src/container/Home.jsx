import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import logo from '../assets/logo.png';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState()
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  console.log(userInfo)
  useEffect(() => {
    if (!userInfo?.sub)
      return;

    console.log(userInfo.sub)
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      console.log("===>", data)
      setUser(data[0]);
    })
      .catch(err => console.log(err));

  }, []);

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className="p-2 w-full flex flex-row items-center shadow-md justify-between">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className='w-28' />
          </Link>

          {user ? <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user-pic" className='w-9 h-9 rounded-full ' />
          </Link> : <div className="w-9 h-9"></div>}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user} />} />
        </Routes>
      </div>
    </div>

  )
}

export default Home