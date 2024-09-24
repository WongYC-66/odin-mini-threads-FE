'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

import API_URL from '@/app/lib/apiUrl';
import ProfileTabs from './tabs';
import ModalUpdateProfile from './modal-update-profile.jsx';

export default function ProfileDetail(props) {

    // 2. create ProfileDetail
    // 3. create Self-page edit logic
    const profile = props.profile

    const fullname = `${profile.userProfile.firstName || ''} ${profile.userProfile.lastName || ''}`

    const [followed, setFollowed] = useState(profile.is_followed)
    const [isSelf, setIsSelf] = useState(false)
    const [open, setOpen] = useState(false)         // update profile modal

    useEffect(() => {
        const { id } = JSON.parse(localStorage.getItem('user'))
        if (id == profile.id)
            setIsSelf(true)

    }, [profile.id])

    const toInstagram = () => {
        alert('to instagram ...')
    }

    const moreInfoClick = () => {
        alert('under development ...')
    }

    const handleEditProfileClick = () => {
        setOpen(true)
    }

    const handleFollowBtnClick = () => {

        const sendRequest = async () => {
            const { token } = JSON.parse(localStorage.getItem('user'))

            let url = `${API_URL}/users`
            url += followed ? "/unfollow/" : "/follow/"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the Bearer token
                },
                body: JSON.stringify({
                    followId: profile.id,
                    unfollowId: profile.id,
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

        setFollowed((prev) => !prev)
    }

    return (
        <div className='flex flex-col w-full min-h-screen'>
            <div className='flex flex-col gap-4 py-4 px-6'>
                {/* Profile Names + Username + Picture */}
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className='font-bold font-size text-2xl'>{fullname}</h2>
                        <p>{profile.username}</p>
                    </div>

                    <div className="w-[75px] h-[75px] overflow-hidden flex justify-center">
                        <Image src={profile.userProfile.photoURL} alt='profile photo' width={85} height={85} className='rounded-full object-cover' />
                    </div>
                </div>

                {/* description */}
                <div className=''>
                    <p>{profile.userProfile.bio}</p>
                </div>

                {/* follower count && instagram button */}
                <div className='flex justify-between'>
                    <p className='text-slate-400'>{`${profile._count.followedBy} followers`}</p>
                    <div className='flex justify-center items-center gap-4 '>
                        <Image src='/instagram.png' alt='to instagram' width={25} height={25} onClick={toInstagram} />
                        <Image src='/more-info.png' alt='more info' width={25} height={25} onClick={moreInfoClick} />
                    </div>
                </div>
            </div>

            {/* Follow & Mention Buttons / edit profile */}
            <div className='flex justify-center gap-6 py-4 px-6 w-full'>
                {isSelf
                    ? <Button className='w-full' onClick={handleEditProfileClick}> Edit Profile </Button>
                    : <>
                        <Button className='w-1/2' onClick={handleFollowBtnClick}> {followed ? 'Following' : 'Follow'} </Button>
                        <Button className='w-1/2'> Mention </Button>
                    </>}
            </div>

            {/* Tabs Section */}
            <div className='grow py-4 w-full'>
                <ProfileTabs profile={profile} />
            </div>

            <ModalUpdateProfile profile={profile} open={open} setOpen={setOpen} setIsLoading={props.setIsLoading} />
        </div >
    );
}