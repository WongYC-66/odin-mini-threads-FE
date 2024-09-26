'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from "@/components/ui/button"

import { sendFollowUnfollowRequest } from '@/app/lib/fetchAPI.js';

export default function SearchCard(props) {

    const { firstName, lastName, photoURL, user, isFollowing } = props.profile
    const [followed, setFollowed] = useState(isFollowing)
    const [followCount, setFollowCount] = useState(user._count.followedBy)

    const handleButtonClick = () => {
        const sendRequest = async () => {
            let { error } = await sendFollowUnfollowRequest(!followed, user.id)
            if (error) return
            setFollowed((prev) => !prev)
            setFollowCount(prev => followed ? prev - 1 : prev + 1)
        }
        sendRequest()
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
                    <div className='ms-3 text-slate-700'>{`${followCount} followers`} </div>
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