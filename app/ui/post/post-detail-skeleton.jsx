'use client'
import { useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import PostSkeleton from './post-skeleton.jsx'

export default function PostDetailSkeleton() {

    const commentSkeletonCount = 4

    const [randomWidth1, setRandomWidth1] = useState(350);
    const [randomWidth2, setRandomWidth2] = useState(250);
    const [randomWidth3, setRandomWidth3] = useState(450);

    useEffect(() => {
        // Generate random widths after the component has mounted (on the client side)
        setRandomWidth1(200 + Math.ceil(Math.random() * 350));
        setRandomWidth2(200 + Math.ceil(Math.random() * 250));
        setRandomWidth3(200 + Math.ceil(Math.random() * 450));
    }, []);

    return (
        <div className='flex flex-col'>
            {/* post skeleton */}
            <div className='flex flex-col p-6 justify-between border-solid border-b-2'>
                <div className='flex items-center gap-2 mb-4'>
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-[100px]" />
                </div>
                <div className='h-[90px] w-full flex flex-col justify-between'>
                    <Skeleton className="h-4" style={{ width: `${randomWidth1}px` }} />
                    <Skeleton className="h-4" style={{ width: `${randomWidth2}px` }} />
                    <Skeleton className="h-4" style={{ width: `${randomWidth3}px` }} />
                </div>
            </div>

            {/* comments skeleton */}
            <div>
                {Array(commentSkeletonCount).fill().map((_, i) => <PostSkeleton key={`${i}+dummy-comment`} />)}
            </div>

        </div>
    );
}