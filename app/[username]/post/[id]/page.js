'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import API_URL from '@/app/lib/apiUrl.js';
import PostDetailSkeleton from '@/app/ui/post/post-detail-skeleton.jsx';
import PostDetail from '@/app/ui/post/post-detail.jsx';

export default function PostPage(props) {

    const pathname = usePathname();
    const postId = pathname.split('/').pop(); // Get the last segment as postId

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { token } = JSON.parse(localStorage.getItem('user'))

        const sendRequest = async () => {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
            });

            let { post, error } = await response.json()

            // if error show error message
            if (error) {
                console.error(error)
                return
            }
            // passed
            setPost(post)
            setIsLoading(false)
        }
        sendRequest()
    }, [postId, isLoading]);

    console.log(post)

    return (
        <div className="h-full">
            <h2 className="hidden md:block text-center font-black my-4">Thread</h2>

            {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0"> */}
            <div id="container" className="container mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">

                {isLoading && <PostDetailSkeleton />}
                {!isLoading && <PostDetail post={post} setIsLoading={setIsLoading}/>}
            </div>

            
        </div>
    )
}