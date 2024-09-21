'use client'
import { useState, useEffect } from 'react'
import moment from 'moment'

import Link from 'next/link'
import Image from 'next/image'

import Comment from './comment.jsx'
import API_URL from '@/app/lib/apiUrl.js'
import ModalNewComment from './modal-create-comment.jsx'

export default function PostDetail(props) {

    console.log(props.post)
    const { author, id: postId, comments: allComments, content, _count, timestamp, isLiked } = props.post

    const [liked, setLiked] = useState(isLiked)
    const [likedCount, setLikedCount] = useState(_count.likedBy)
    const [comments, setComments] = useState(allComments)
    const [open, setOpen] = useState(false)         // comment modal

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

    const handleCommentIconClick = () => {
        setOpen(prev => !prev)
    }

    console.log(comments)

    return (
        <div className=''>
            <div className='flex flex-col p-6 justify-between border-solid border-b-2'>
                <div className='flex items-center gap-2'>
                    {/* Post author Photo */}
                    <Link href={`/@${author.username}`}>
                        <Image alt='photo' src={photoURL} width={50} height={50} className='no-route' />
                    </Link>

                    {/* Post author username */}
                    <div className='min-h-4 no-route'>
                        <span className=' font-bold hover:underline'>
                            <Link href={`/@${author.username}`}>{author.username}</Link>
                        </span>
                        <span className='ms-4 font-light text-slate-400'>{relativeTime}</span>
                    </div>

                </div>

                {/* Post's content */}
                <div className='h-[90px] w-full flex flex-col justify-between my-4'>
                    <div className='min-h-4'>{content}</div>
                </div>

                <div className='min-h-4 flex mt-4'>
                    {/* Like Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3 no-route' onClick={handleLikeClick}>

                        {/* liked, show red heart */}
                        {liked && <Image alt='likeIcon' src='/red-heart.png' width={36} height={36}></Image>}

                        {/* not liked, show outlined heart */}
                        {!liked && <Image alt='likeIcon' src='/heart-lite.png' width={24} height={24}></Image>}

                        <p className='ms-2'>{likedCount}</p>
                    </div>

                    {/* Comment Icon and count */}
                    <div className='flex justify-center items-center p-3 rounded-3xl hover:bg-slate-100 hover:border-spacing-3 mx-4' onClick={handleCommentIconClick}>
                        <Image alt='chatIcon' src="/chat.png" width={24} height={24}></Image>
                        <p className='ms-2'>{_count.comments}</p>
                    </div>
                </div>
            </div>


            {/* Comments */}
            {comments && comments.map(comment => <Comment key={comment.id} comment={comment} setComments={setComments} />)}

            {/* New Comment Modal Window */}
            <ModalNewComment open={open} setOpen={setOpen} postAuthorName={author.username} postId={postId} setIsLoading={props.setIsLoading}/>

        </div>
    );
}