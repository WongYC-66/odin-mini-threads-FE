'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button"

import API_URL from '../../lib/apiUrl.js'

export default function SearchCard(props) {

    const { firstName, lastName, photoURL, user, isFollowing } = props.profile

    const [followed, setFollowed] = useState(isFollowing)


    const handleButtonClick = (toFollow) => {
        // toFollow = Boolean

        const sendRequest = async () => {
            const data = JSON.parse(localStorage.getItem('user'))
            if (!data) return
            const { token } = data

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
                    <div className="w-[50px] h-[50px] overflow-hidden flex justify-center">
                        <Image alt='photo' src={photoURL} className='rounded-full object-cover' width={50} height={50} />
                    </div>
                </Link>

                {/* Names & username, follower count  */}
                <Link href={`/@${user.username}`} className='hover:cursor-pointer'>
                    <div className='ms-3 font-bold hover:underline'>{user.username}</div>
                    <div className='ms-3 text-slate-400'>{`${firstName || ''} ${lastName || ''}`} </div>
                    <div className='ms-3 text-slate-700'>{`${user._count.followedBy} followers`} </div>
                </Link>
            </div>

            {/* Follow button */}
            {followed
                ? <Button className="font-bold text-slate-400 w-28" onClick={() => handleButtonClick(false)}>Following</Button>
                : <Button className="font-bold w-28" onClick={() => handleButtonClick(true)}> Follow </Button>
            }

        </div >
    );
}