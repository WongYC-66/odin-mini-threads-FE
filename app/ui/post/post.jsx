'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function PostSkeleton() {

    return (
        <div className='flex p-6 justify-between items-center border-solid border-b-2'>
            {/* User Icon and What's new */}
            <div className='flex items-center'>
                <Link href={`/@ToDo`}>
                    <Image alt='user2.png' src='/user2.png' width={50} height={50} />
                </Link>
                <div className='ms-3 text-slate-400'>{`What's new`}</div>
            </div>

            <Button className='float-end'>Post</Button>
        </div>
    );
}