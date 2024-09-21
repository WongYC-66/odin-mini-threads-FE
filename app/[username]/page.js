'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ProfileSkeleton from '../ui/profile/profile-skeleton';

export default function ProfilePage() {

    const router = useRouter()
    // if not url unlike @user3, re-route to home page
    const breadcrumbLast = usePathname().split('/').pop()
    if (!breadcrumbLast.startsWith("@"))
        router.push('/')

    const [isLoading, setIsLoading] = useState(true)

    const username = usePathname().split('/@').pop()
    console.log(username)

    const handleGoBackClick = () => {
        router.back()
    }


    return (
        <div className="h-full">
            <div className='relative flex justify-center items-center'>
                <Image alt='back' src='/back-button.png' width={30} height={30} className='inline absolute left-4 hover:scale-105 duration-150' onClick={handleGoBackClick} />
                <h2 className="hidden md:block text-center font-black my-4">{username}</h2>
            </div>

            {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0"> */}
            <div id="container" className="container mx-auto w-screen md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">

                {isLoading && <ProfileSkeleton />}
                {/* {!isLoading && <PostDetail post={post} setIsLoading={setIsLoading} />} */}
            </div>


        </div>
    )
}