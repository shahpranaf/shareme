import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search} from '../components'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pinDetail/:pinId" element={<PinDetail />} />
          <Route path="/createPin" element={<CreatePin />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>

    </div>
  )
}

export default Pins