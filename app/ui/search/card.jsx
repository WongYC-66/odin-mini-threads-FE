'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button"

import API_URL from '../../lib/apiUrl.js'


export default function SearchCard(props) {

    const { firstName, lastName, user, isFollowing } = props.profile

    const [followed, setFollowed] = useState(isFollowing)

    console.log(props.profile)

    const handleButtonClick = (toFollow) => {
        // toFollow = Boolean
        console.log(user.id)

        const sendRequest = async () => {
            const { token } = JSON.parse(localStorage.getItem('user'))

            let url = `${API_URL}/users`
            url += toFollow ? "/follow/" : "/unfollow/"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
                body: JSON.stringify({
                    followId: user.id,
                    unfollowId: user.id,
                })
            });

            let { error } = await response.json()

            // if error show error message
            if (error) {
                console.error(error)
                alert("Ooops, something went wrong, try again")
                return
            }
        }

        sendRequest()

        setFollowed((prev) => !prev)
    }

    return (
        <div className='flex p-4 items-center justify-between'>
            <div className='flex items-center'>
                {/* Image */}
                <Link href={`/@${user.username}`}>
                    <Image alt='user2.png' src='/user2.png' width={50} height={50} />
                </Link>

                {/* Names & username, follower count  */}
                <div className=''>
                    <div className='ms-3 font-bold'>{user.username}</div>
                    <div className='ms-3 text-slate-400'>{`${firstName} ${lastName}`} </div>
                    <div className='ms-3 text-slate-400'>{`${user._count.followedBy} followers`} </div>
                </div>
            </div>

            {/* Follow button */}
            {followed
                ? <Button className="font-bold text-slate-400 w-28" onClick={() => handleButtonClick(false)}>Following</Button>
                : <Button className="font-bold w-28" onClick={() => handleButtonClick(true)}> Follow </Button>
            }

        </div >
    );
}