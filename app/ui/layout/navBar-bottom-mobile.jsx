'use client'

import Image from 'next/image';
import Link from 'next/link';

export default function NavBarBottom(props) {
    const username = props.username

    return (
        <div className="fixed bottom-0 flex gap-6 justify-center w-screen bg-white py-4 z-10">

            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href='/'>
                    <Image alt="home.png" src="/home.png" width={40} height={40} />
                </Link>
            </div>

            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href='/search'>
                    <Image alt="search.png" src="/search.png" width={40} height={40} />
                </Link>
            </div>


            {/* add overlay to add new post */}
            <div className='bg-slate-200 px-4 py-3 rounded-2xl hover:bg-slate-300 hover:cursor-pointer'>
                <Image alt="plus.png" src="/plus.png" width={40} height={40} />
            </div>


            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href='/activity'>
                    <Image alt="heart.png" src="/heart.png" width={40} height={40} />
                </Link>
            </div>


            <div className='px-4 py-3 rounded-2xl hover:bg-slate-200 hover:cursor-pointer'>
                <Link href={`/@${username}`}>
                    <Image alt="user.png" src="/user.png" width={40} height={40} />
                </Link>
            </div>
        </div>
    );
}