'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ModalNewPost from './modal-create-post.jsx'
import SettingMenuBar from './setting-menubar.jsx'
import { displayPurposeOnly, readLocalStorage } from '@/app/lib/utils.js';

export default function NavBarLeft(props) {

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
        <nav className="hidden md:flex flex-col justify-between fixed min-h-screen px-2 py-4 me-16">
            <div className='flex justify-center'>
                {/* LogoIcon */}
                <Link href='/'>
                    <Image alt="logo.png" src="/logo.png" width={48} height={48}
                        className='hover:scale-110 ease-in-out duration-200' />
                </Link>
            </div>

            {/* 5 buttons */}
            <div className="flex flex-col justify-between items-center gap-4">
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

            </div>

            {/* 2 buttons */}
            <div className="flex flex-col justify-between items-center gap-4 p-1">
                <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                    <Image alt="thumbtack.png" src="/thumbtack.png" width={40} height={40} onClick={displayPurposeOnly}/>
                </div>
                <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                    {/* <Image alt="settings.png" src="/settings.png" width={40} height={40} /> */}
                    <SettingMenuBar setIsLoggedIn={props.setIsLoggedIn} />
                </div>
            </div>

            {/* Modal upon clicking new post */}
            <ModalNewPost open={openModal} setOpen={setOpenModal} />
        </nav>
    );
}