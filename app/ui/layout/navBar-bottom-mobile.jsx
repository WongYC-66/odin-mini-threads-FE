'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import ModalNewPost from './modal-create-post.jsx'
import { displayPurposeOnly, readLocalStorage } from '@/app/lib/utils.js';

export default function NavBarBottom() {

    const [openModal, setOpenModal] = useState(false)
    const [username, setUsername] = useState('false')

    useEffect(() => {
        const { username } = readLocalStorage()
        setUsername(username)
    }, [])

    const handleAddNew = () => {
        setOpenModal(prev => !prev)
    }
    return (
        <div className="fixed bottom-0 flex gap-6 justify-center w-screen bg-white py-4 min-h-[110px] z-10">

            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href='/'>
                    <Image alt="home.png" src="/home.png" width={40} height={40} />
                </Link>
            </div>

            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href='/search'>
                    <Image alt="search.png" src="/search.png" width={40} height={40} />
                </Link>
            </div>


            <div className='bg-slate-200 px-4 py-3 rounded-2xl hover:bg-slate-300 hover:cursor-pointer' onClick={handleAddNew}>
                <Image alt="plus.png" src="/plus.png" width={40} height={40} />
            </div>


            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer' onClick={displayPurposeOnly}>
                {/* <Link href='/activity'> */}
                    <Image alt="heart.png" src="/heart.png" width={40} height={40} />
                {/* </Link> */}
            </div>


            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href={`/@${username}`}>
                    <Image alt="user.png" src="/user.png" width={40} height={40} />
                </Link>
            </div>

            {/* Modal upon clicking new post */}
            <ModalNewPost open={openModal} setOpen={setOpenModal} />
        </div>
    );
}