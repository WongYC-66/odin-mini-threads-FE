'use client'

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import ModalNewPost from '../layout/modal-create-post.jsx'

export default function AddPostSkeleton(props) {

    const [username, setUsername] = useState('')
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const { username } = JSON.parse(localStorage.getItem('user')) || {}
        if (username) {
            setUsername(username)
        }

    }, [])

    const handleAddNew = () => {
        setOpenModal(prev => !prev)
    }

    return (
        <div className='hidden md:flex p-6 justify-between items-center border-solid border-b-2' >
            {/* User Icon and What's new */}
            <div className='grow flex items-center'>
                <Link href={`/@${username}`}>
                    <Image alt='user2.png' src='/user2.png' width={50} height={50} />
                </Link>
                <div className='ms-3 text-slate-400 w-full' onClick={handleAddNew}>{`What's new`}</div>
            </div>

            <Button className='float-end' onClick={handleAddNew}>Post</Button>

            {/* Modal upon clicking new post */}
            <ModalNewPost open={openModal} setOpen={setOpenModal} setIsLoading={props.setIsLoading}/>
        </div>
    );
}