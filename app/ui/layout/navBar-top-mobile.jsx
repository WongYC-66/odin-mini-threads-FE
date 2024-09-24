'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import SettingMenuBar from './setting-menubar';

export default function NavBarTop(props) {

    const router = useRouter();

    const handleGoBackClick = () => {
        router.back()
    }

    return (
        <div className='fixed flex justify-between items-center w-screen bg-white px-8 py-4 z-10'>

            <Image alt='back' src='/back-button.png' width={30} height={30} className='md:hidden hover:scale-105 duration-150' onClick={handleGoBackClick} />

            {/* LogoIcon */}
            <Link href='/'>
                <Image alt="logo.png" src="/logo.png" width={48} height={48}
                    className='hover:scale-110 ease-in-out duration-200' />
            </Link>

            <div className='px-4 py-2 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <SettingMenuBar setIsLoggedIn={props.setIsLoggedIn} />
            </div>

        </div>
    );
}