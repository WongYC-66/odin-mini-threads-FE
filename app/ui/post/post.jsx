'use client'

import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import API_URL from "../../lib/apiUrl.js"

export default function Post(props) {

    const { id: postId, author, content, _count, timestamp, isLiked } = props.post
    console.log(props.post)

    const [liked, setLiked] = useState(isLiked)
    const [likedCount, setLikedCount] = useState(_count.likedBy)

    const photoURL = author?.userProfile.photoURL || "/user2.png"
    const relativeTime = moment(timestamp).fromNow();

    const handleLikeClick = () => {

        const sendRequest = async () => {
            const { id: userId, token } = JSON.parse(localStorage.getItem('user'))

            const response = await fetch(`${API_URL}/posts/like-unlike/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    like: !liked,
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

        setLiked((prev) => !prev)
        setLikedCount((prev) => liked ? prev - 1 : prev + 1)     // if originalled liked, now it to unlike
    }


    return (
        <div className='flex p-6 justify-between border-solid border-b-2 hover:cursor-pointer'>
            {/* User Photo */}
            <div className='relative flex items-start h-min-0'>
                <Link href={`/@${author.username}`}>
                    <Image alt='photo' src={photoURL} width={50} height={50} />
                </Link>

                {/* <Image alt='photo' src='/add-circle.png' width={20} height={20}
                    className='absolute top-6 right-0 hover:scale-110 duration-150 ease-in-out '/>
                    */}
            </div>

            <div className='w-full ms-3 flex flex-col justify-between'>

                {/* author username */}
                <div className='min-h-4'>
                    <span className=' font-bold hover:underline'>{author.username}</span>
                    <span className='ms-4 font-light text-slate-400'>{relativeTime}</span>
                </div>

                {/* post's content */}
                <div className='min-h-4'>{content}</div>

                <div className='min-h-4 flex'>
                    {/* Like Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3' onClick={handleLikeClick}>

                        {/* liked, show red heart */}
                        {liked && <Image alt='likeIcon' src='/red-heart.png' width={36} height={36}></Image>}

                        {/* not liked, show outlined heart */}
                        {!liked && <Image alt='likeIcon' src='/heart-lite.png' width={24} height={24}></Image>}
                        
                        <p className='ms-2'>{likedCount}</p>
                    </div>

                    {/* Comment Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3 mx-4 '>
                        <Image alt='chatIcon' src="/chat.png" width={24} height={24}></Image>
                        <p className='ms-2'>{_count.comments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}