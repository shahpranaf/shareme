import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { Spinner, MasonaryLayout } from '../components';
import { feedQuery, searchQuery } from '../utils/data';


const Feed = () => {

    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true);
        if (categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                })
                .catch(err => console.log(err))

        } else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data);
                    setLoading(false);
                })
                .catch(err => console.log(err));
        }

    }, [categoryId])


    if (loading) {
        return (
            <Spinner message={"We are adding new ideas to your feed"} />
        )
    }

    return (
        <div>
            {pins?.length ? (
                <MasonaryLayout pins={pins} />
            )
                :

                <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                    No Pins Found!
                </div>

            }
        </div>
    )
}

export default Feed