'use client'

import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import ModalNewPost from '../layout/modal-create-post.jsx'
import { readLocalStorage } from '@/app/lib/utils.js';

export default function AddPostSkeleton(props) {

    const [openModal, setOpenModal] = useState(false)
    const [username, setUsername] = useState('false')
    const [photoURL, setPhotoURL] = useState('/user2.png')

    useEffect(() => {
        const { username, photoURL } = readLocalStorage()
        setUsername(username)
        setPhotoURL(photoURL)
    }, [])

    const handleAddNew = () => {
        setOpenModal(prev => !prev)
    }

    return (
        <div className='hidden md:flex p-6 justify-between items-center border-solid border-b-2' >
            {/* User Icon and What's new */}
            <div className='grow flex items-center'>
                <Link href={`/@${username}`}>
                    <div className="w-[50px] h-[50px] overflow-hidden flex justify-center">
                        <Image alt='photo' src={photoURL} width={50} height={50} className='rounded-full' />
                    </div>
                </Link>
                <div className='ms-3 text-slate-400 w-full' onClick={handleAddNew}>{`What's new`}</div>
            </div>

            <Button className='float-end' onClick={handleAddNew}>Post</Button>

            {/* Modal upon clicking new post */}
            <ModalNewPost open={openModal} setOpen={setOpenModal} setIsLoading={props.setIsLoading} />
        </div>
    );
}