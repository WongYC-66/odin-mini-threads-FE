'use client'
import { useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {

    const [randomWidth1, setRandomWidth1] = useState(450);
    const [randomWidth2, setRandomWidth2] = useState(250);

    useEffect(() => {
        // Generate random widths after the component has mounted (on the client side)
        setRandomWidth1(150 + Math.ceil(Math.random() * 250));
        setRandomWidth2(150 + Math.ceil(Math.random() * 250));
    }, []);

    return (
        <div className='flex p-6 justify-between border-solid border-b-2'>
            <div className='flex items-start'>
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className='h-[90px] w-full ms-3 flex flex-col justify-between'>
                <Skeleton className="h-4 w-[125px]" />
                <Skeleton className="h-4" style={{ width: `${randomWidth1}px` }} />
                <Skeleton className="h-4" style={{ width: `${randomWidth2}px` }} />
            </div>
        </div>
    );
}