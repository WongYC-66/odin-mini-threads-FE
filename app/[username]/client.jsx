'use client'

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import ProfileSkeleton from '../ui/profile/profile-skeleton';
import ProfileDetail from '../ui/profile/profile-detail';

import { fetchUserProfile } from '../lib/fetchAPI';

export default function ProfilePageClient() {

    const router = useRouter()
    const endpoint = usePathname().split('/').pop()
    if (!endpoint.startsWith("@"))    // invalid url like "@user1", re-route to home
        router.push('/')

    const [isLoading, setIsLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const username = endpoint.split('@').pop()

    useEffect(() => {
        const sendRequest = async () => {
            let { profile, error } = await fetchUserProfile(username)
            if (error) return
            setProfile(profile)
            setIsLoading(false)
        }
        sendRequest()
    }, [username, isLoading])

    const handleGoBackClick = () => {
        router.back()
    }

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
