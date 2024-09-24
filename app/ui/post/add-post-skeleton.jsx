'use client'

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import ModalNewPost from '../layout/modal-create-post.jsx'
import { readLocalStorage } from '@/app/lib/utils.js';

export default function AddPostSkeleton(props) {

    const {username, photoURL} = readLocalStorage()

    const [openModal, setOpenModal] = useState(false)

    const handleAddNew = () => {
        setOpenModal(prev => !prev)
    }

    return (
        <div className='hidden md:flex p-6 justify-between items-center border-solid border-b-2' >
            {/* User Icon and What's new */}
            <div className='grow flex items-center'>
                <Link href={`/@${username}`}>
                    <Image alt='photo' src={photoURL} width={50} height={50} className='rounded-full'/>
                </Link>
                <div className='ms-3 text-slate-400 w-full' onClick={handleAddNew}>{`What's new`}</div>
            </div>

            <Button className='float-end' onClick={handleAddNew}>Post</Button>

            {/* Modal upon clicking new post */}
            <ModalNewPost open={openModal} setOpen={setOpenModal} setIsLoading={props.setIsLoading} />
        </div>
    );
}