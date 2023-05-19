import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, MasonaryLayout } from '../components';


const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { catergoryId } = useParams()

    useEffect(() => {
      
    
    }, [])
    

    if(loading) {
        return (
            <Spinner message={"We are adding new ideas to your feed"} />
        )
    }

    return (
        <div>Feed</div>
    )
}

export default Feed