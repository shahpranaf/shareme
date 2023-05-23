import React, { useState } from 'react'
import { client, urlFor } from '../client';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import { v4 as uuidv4 } from 'uuid';

import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';


const Pin = ({ pin }) => {
    const { postedBy, image, _id, destination, save } = pin;
    const [postHovered, setPostHovered] = useState(false);
    const navigate = useNavigate();
    const user = fetchUser();

    const alreadySaved = (save?.filter(item => item?.postedBy?._id === user?.sub))?.length;
    console.log(alreadySaved, pin)

    const savePin = (id) => {
        console.log(id)
        if (!alreadySaved) {
            client.patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?.sub,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.sub
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    const deletePin = (id) => {
        client.delete(id)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className='m-2'>
            <div
                className='relative flex flex-col cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
            >
                {image && (
                    <img src={(urlFor(image).width(250).url())} className="rounded-lg w-full" alt='user-post' />
                )}
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap2'>
                                <a href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                                    <MdDownloadForOffline />
                                </a>
                            </div>

                            {alreadySaved ? (
                                <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    {pin?.save?.length} Saved
                                </button>
                            ) : (
                                <button type="button"
                                    onClick={e => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    Save
                                </button>
                            )
                            }

                        </div>
                        <div className=" flex justify-between items-center gap-2 w-full">
                            {
                                <a
                                    href={destination}
                                    target="_blank"
                                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                    rel="noreferrer"
                                >
                                    {' '}
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 15 ? destination?.slice(0, 15) : destination }
                                </a>
                            }
                            {
                                postedBy?._id === user?._id && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePin(_id);
                                        }}
                                        className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`} className="flex items-center gap-2 mt-2">
                <img
                className='w-9 h-9 rounded-full object-cover'
                src={postedBy?.image}
                alt="user-profile" />
                <p className='font-semibold capitalize'>{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Pin