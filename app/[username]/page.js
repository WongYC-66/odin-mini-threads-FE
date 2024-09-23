'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ProfileSkeleton from '../ui/profile/profile-skeleton';

import API_URL from '@/app/lib/apiUrl.js'
import ProfileDetail from '../ui/profile/profile-detail';

export default function ProfilePage() {

    const router = useRouter()
    const breadcrumbLast = usePathname().split('/').pop()
    if (!breadcrumbLast.startsWith("@"))    // invalid url like "@user1", re-route to home
        router.push('/')

    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const username = usePathname().split('/@').pop()

    useEffect(() => {

        const sendRequest = async () => {

            const { token } = JSON.parse(localStorage.getItem('user'))

            const response = await fetch(`${API_URL}/profiles/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
            });

            let { profile, postLiked, error } = await response.json()

            // if error show error message
            if (error) {
                console.error(error)
                alert("Ooops, something went wrong, try again")
                return
            }

            // passed
            postLiked = new Set(postLiked)
            profile.threads.forEach(t => t.isLiked = postLiked.has(t.id))
            profile.replies.forEach(({Post}) => Post.isLiked = postLiked.has(Post.id))

            setProfile(profile)
            setIsLoading(false) // partially refresh by fetch at root url if triggers from home screen

        }

        sendRequest()
    }, [username])


    const handleGoBackClick = () => {
        router.back()
    }

    console.log(profile)


    return (
        <div className="h-full">
            <div className='relative flex justify-center items-center'>
                <Image alt='back' src='/back-button.png' width={30} height={30} className='hidden md:inline-block absolute left-4 hover:scale-105 duration-150' onClick={handleGoBackClick} />
                <h2 className="hidden md:block text-center font-black my-4">{username}</h2>
            </div>

            {/* <div id="container" className="container mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0"> */}
            <div id="container" className="container mx-auto w-screen md:max-w-md lg:max-w-lg xl:max-w-xl border-solid border-2 rounded-t-3xl min-h-screen bg-white p-0">

                {isLoading && <ProfileSkeleton />}
                {!isLoading && <ProfileDetail profile={profile} setIsLoading={setIsLoading} />}
            </div>


        </div>
    )
}