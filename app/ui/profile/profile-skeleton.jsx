'use client'

import { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"


export default function ProfileSkeleton() {

    // todo, refer to Threads profile page
    // 1. create skeleton
    // 2. create ProfileDetail
    // 3. create Self-page edit logic

    return (
        <div className='flex flex-col w-full min-h-screen'>
            {/*  */}
            <div className='flex flex-col gap-4 py-4 px-6'>

                {/* Profile Names + Username + Picture */}
                <div className='flex justify-between items-center'>
                    <div>
                        <Skeleton className="h-6 w-44 my-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>

                    <Skeleton className="h-20 w-20 rounded-full" />
                </div>

                {/* description */}
                <div className=''>
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-72 my-2" />
                    <Skeleton className="h-4 w-36" />
                </div>

                {/* follower count && instagram button */}
                <div className='flex justify-between'>
                    <Skeleton className="h-4 w-28" />
                    <div className='flex'>
                        <Skeleton className="h-4 w-6 mx-4" />
                        <Skeleton className="h-4 w-6" />
                    </div>
                </div>
            </div>

            {/* Follow & Mention Buttons */}
            <div className='flex justify-center gap-6 py-4 px-6'>
                <Skeleton className="my-1 h-8 w-48" />
                <Skeleton className="my-1 h-8 w-48" />
            </div>

            {/* Tabs Section */}
            <div className='flex justify-center gap-6 py-4 px-6'>
                <Skeleton className="my-1 h-8 w-48" />
                <Skeleton className="my-1 h-8 w-48" />
                <Skeleton className="my-1 h-8 w-48" />
            </div>

            {/* Comments Section */}
            <div className='grow flex flex-col justify-center gap-6 py-4 px-6'>
                <Skeleton className="grow my-1"/>
            </div>

        </div >
    );
}