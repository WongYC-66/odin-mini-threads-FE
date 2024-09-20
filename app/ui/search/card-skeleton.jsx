'use client'

import {useState, useEffect} from 'react';

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"


export default function CardSkeleton() {

    return (
        <div className='flex p-4 items-center justify-between'>
            <div className='flex items-center'>
                {/* Image */}
                <Skeleton className="h-10 w-10 rounded-full" />

                {/* Names & username, follower count  */}
                <div className=''>
                    <Skeleton className="ms-3 my-1 h-4 w-[75px]"/>
                    <Skeleton className="ms-3 my-1 h-4 w-[175px]"/>
                    <Skeleton className="ms-3 my-1 h-4 w-[125px]"/>
                </div>
            </div>

            {/* Follow button */}
            <Skeleton className="h-8 w-28" />
        </div >
    );
}