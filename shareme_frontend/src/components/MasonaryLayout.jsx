import React from 'react'
import Masonry from 'react-masonry-css';
import Pin from './Pin';


const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1
}

const MasonaryLayout = ({pins}) => {
  return (
    <Masonry className='flex animate-slide-fwd' columnClassName="pl-30 bg-clip-padding" breakpointCols={breakpointColumnsObj} >
      { pins?.map((pin) => <Pin key={pin._id} pin={pin} className="w-max h-full" /> )}
    </Masonry>
  )
}

export default MasonaryLayout