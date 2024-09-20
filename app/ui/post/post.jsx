'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function Post(props) {

    const {author, content, _count} = props.post
    console.log(props.post)

    const photoURL = author?.userProfile.photoURL || "/user2.png" 


    // Todo add, like button
    // add user profile follow button

    return (
        <div className='flex p-6 justify-between border-solid border-b-2'>
            {/* User Photo */}
            <div className='flex items-start'>
                <Link href={`/@${author.username}`}>
                    <Image alt='photo' src={photoURL} width={50} height={50} />
                </Link>
            </div>

            <div className='w-full ms-3 flex flex-col justify-between'>

                {/* author username */}
                <div className='min-h-4 font-bold'>{author.username}</div>

                {/* post's content */}
                <div className='min-h-4'>{content}</div>

                <div className='min-h-4 flex mt-4'>
                    {/* Like Icon and count */}
                    <div className='flex justify-center items-center'>
                        <Image alt='likeIcon' src="/heart-lite.png" width={24} height={24}></Image>
                        <p className='ms-2'>{_count.likedBy}</p>
                    </div>

                    {/* Comment Icon and count */}
                    <div className='flex justify-center items-center mx-8'>
                        <Image alt='chatIcon' src="/chat.png" width={24} height={24}></Image>
                        <p className='ms-2'>{_count.comments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}