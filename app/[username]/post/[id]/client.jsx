'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import PostDetailSkeleton from '@/app/ui/post/post-detail-skeleton.jsx';
import PostDetail from '@/app/ui/post/post-detail.jsx';
import { getAPost } from '@/app/lib/fetchAPI';

export default function PostPageClient(props) {
    const router = useRouter();
    const pathname = usePathname();
    const postId = pathname.split('/').pop(); // Get the last segment as postId

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sendRequest = async () => {
            const { post, error } = await getAPost(postId)
            if (!error) {
                setPost(post)
                setIsLoading(false)
            }
        }
        sendRequest()
    }, [postId, isLoading]);

    const handleGoBackClick = () => {
        router.back()
    }

    return (
        <div className="h-full">
            <div className='relative flex justify-center items-center'>
                <Image alt='back' src='/back-button.png' width={30} height={30} className='hidden md:inline-block absolute left-4 hover:scale-105 duration-150' onClick={handleGoBackClick} />
                <h2 className="hidden md:block text-center font-black my-4">Thread</h2>
            </div>

            <div id="container" className="container mx-auto w-screen md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">
                {isLoading && <PostDetailSkeleton />}
                {!isLoading && <PostDetail post={post} setIsLoading={setIsLoading} />}
            </div>
        </div>
    )
}
