'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function NavBarTop(props) {

    return (
        <div className="relative py-4">
            <div className='flex justify-center items-center'>
                {/* LogoIcon */}
                <Link href='/'>
                    <Image alt="logo.png" src="/logo.png" width={48} height={48}
                        className='hover:scale-110 ease-in-out duration-200' />
                </Link>
            </div>

            <div className='absolute top-3 right-3 px-4 py-2 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Image alt="settings.png" src="/settings.png" width={40} height={40} />
            </div>

        </div>
    );
}