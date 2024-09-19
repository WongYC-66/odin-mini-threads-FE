'use client'

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function PostSkeleton() {

    const [username, setUsername] = useState('')

    useEffect(() => {
        const { username, id, token } = JSON.parse(localStorage.getItem('user')) || {}
        if (username) {
            setUsername(username)
        }

    }, [])

    return (
        <div className='flex p-6 justify-between items-center border-solid border-b-2'>
            {/* User Icon and What's new */}
            <div className='flex items-center'>
                <Link href={`/@${username}`}>
                    <Image alt='user2.png' src='/user2.png' width={50} height={50} />
                </Link>
                <div className='ms-3 text-slate-400'>{`What's new`}</div>
            </div>

            <Button className='float-end'>Post</Button>
        </div>
    );
}