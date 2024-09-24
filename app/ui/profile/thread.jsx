'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

import ModalNewComment from '@/app/ui/post/modal-create-comment.jsx';
import { sendLikeUnlikePost } from '@/app/lib/fetchAPI';

export default function Thread(props) {
    const router = useRouter()
    const { id: postId, author, content, _count, timestamp, isLiked } = props.thread

    const [liked, setLiked] = useState(isLiked)
    const [likedCount, setLikedCount] = useState(_count.likedBy)
    const [open, setOpen] = useState(false)         // comment modal

    const photoURL = author?.userProfile.photoURL || "/user2.png"
    const relativeTime = moment(timestamp).fromNow();

    const handleLikeClick = () => {
        const sendRequest = async () => {
            let { error } = await sendLikeUnlikePost(!liked, postId)
            if (error) return
            setLiked((prev) => !prev)
            setLikedCount((prev) => liked ? prev - 1 : prev + 1)     // if originalled liked, now it to unlike
        }
        sendRequest()
    }

    const routingClick = (e) => {
        // Prevent redirection if the click originated from the like button or user icon
        if (e.target.closest('.no-route')) {
            e.stopPropagation(); // Stop the event from bubbling up
        } else if (e.target.closest('.route')) {
            // Handle routing logic
            router.push(`/@${author.username}/post/${postId}`)
        }
    }

    const handleCommentIconClick = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className='flex px-6 my-2 justify-between hover:cursor-pointer z-5 route' onClick={routingClick}>
            {/* User Photo */}
            <div className='flex flex-col items-center h-min-0'>
                <Link href={`/@${author.username}`}>
                    <div className="w-[50px] h-[50px] overflow-hidden flex justify-center">
                        <Image alt='photo' src={photoURL} width={50} height={50} className='rounded-full object-cover no-route' />
                    </div>
                </Link>
                {/* slim rectangular bar */}
                <div className="bg-gray-200 w-1 h-full my-2"></div>
            </div>

            <div className='w-full ms-3 flex flex-col justify-between'>

                {/* author username */}
                <div className='min-h-4 no-route'>
                    <span className=' font-bold hover:underline'>
                        <Link href={`/@${author.username}`}>{author.username}</Link>
                    </span>
                    <span className='ms-4 font-light text-slate-400'>{relativeTime}</span>
                </div>

                {/* post's content */}
                <div className='min-h-4'>{content}</div>

                <div className='min-h-4 flex'>
                    {/* Like Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3 no-route' onClick={handleLikeClick}>

                        {/* liked, show red heart */}
                        {liked && <Image alt='likeIcon' src='/red-heart.png' width={36} height={36}></Image>}

                        {/* not liked, show outlined heart */}
                        {!liked && <Image alt='likeIcon' src='/heart-lite.png' width={24} height={24}></Image>}

                        <p className='ms-2'>{likedCount}</p>
                    </div>

                    {/* Comment Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3 mx-4 no-route' onClick={handleCommentIconClick}>
                        <Image alt='chatIcon' src="/chat.png" width={24} height={24}></Image>
                        <p className='ms-2'>{_count.comments}</p>
                    </div>
                </div>


            </div>

            {/* New Comment Modal Window */}
            <ModalNewComment open={open} setOpen={setOpen} postAuthorName={author.username} postId={postId} setIsLoading={props.setIsLoading} />
        </div>
    );
}