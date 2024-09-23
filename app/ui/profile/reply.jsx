'use client'

import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

export default function Reply(props) {

    const { id: commentId, author, content, timestamp } = props.reply

    const photoURL = author?.userProfile.photoURL || "/user2.png"
    const relativeTime = moment(timestamp).fromNow();

    return (
        <div className='flex px-6 my-2 justify-between'>
            {/* comment User Photo */}
            <div className='relative flex items-start h-min-0'>
                <Link href={`/@${author.username}`}>
                    <Image alt='photo' src={photoURL} width={50} height={50} />
                </Link>
            </div>

            <div className='w-full ms-3 flex flex-col justify-between'>

                {/* comment author username */}
                <div className='min-h-4'>
                    <span className=' font-bold hover:underline'>
                        <Link href={`/@${author.username}`}>{author.username}</Link>
                    </span>
                    <span className='ms-4 font-light text-slate-400'>{relativeTime}</span>
                </div>

                {/* comment's content */}
                <div className='min-h-4'>{content}</div>

            </div>
        </div>
    );
}