'use client'

import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {

    const randomWidth1 = (150 + Math.ceil(Math.random() * 250))
    const randomWidth2 = (150 + Math.ceil(Math.random() * 250))

    console.log({randomWidth1,randomWidth2})

    return (
        <div className='flex p-6 justify-between border-solid border-b-2'>
            <div className='flex items-start'>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className='h-[90px] w-full ms-3 flex flex-col justify-between'>
                <Skeleton className="h-4 w-[125px]" />
                <Skeleton className="h-4" style={{ width: `${randomWidth1}px` }}/>
                <Skeleton className="h-4" style={{ width: `${randomWidth2}px` }}/>
            </div>
        </div>
    );
}