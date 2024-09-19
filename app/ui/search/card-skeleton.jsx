'use client'

import Image from 'next/image';

import { Button } from "@/components/ui/button"

export default function CardSkeleton() {

    return (
        <div className='flex p-4 items-center justify-between'>
            <div className='flex items-center'>
                {/* Image */}
                <Image alt='user2.png' src='/user2.png' width={50} height={50} />

                {/* Names & username, follower count  */}
                <div className=''>
                    <div className='ms-3 font-bold'>...loading </div>
                    <div className='ms-3 text-slate-400'>  </div>
                    <div className='ms-3 text-slate-400'>  </div>
                </div>
            </div>

            {/* Follow button */}
            <Button className="font-bold w-28" onClick={() => handleButtonClick(true)}> Follow </Button>

        </div >
    );
}