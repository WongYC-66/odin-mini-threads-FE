import Image from 'next/image';
import Link from 'next/link';

export default function NavBarLeft(props) {

    const username = props.username

    return (
        <nav className="flex flex-col justify-between pe-16">
            <div>
                {/* LogoIcon */}
                <Link href='/'>
                    <Image alt="logo.png" src="/logo.png" width={40} height={40} />
                </Link>
            </div>

            {/* 5 buttons */}
            <div className="flex flex-col justify-between gap-4">
                <Link href='/'>
                    <Image alt="home.png" src="/home.png" width={40} height={40} />
                </Link>

                <Link href='/search'>
                    <Image alt="search.png" src="/search.png" width={40} height={40} />
                </Link>

                {/* add overlay to add new post */}
                <Image alt="plus.png" src="/plus.png" width={40} height={40} />

                <Link href='/activity'>
                    <Image alt="heart.png" src="/heart.png" width={40} height={40} />
                </Link>

                <Link href={`/@${username}`}>
                    <Image alt="user.png" src="/user.png" width={40} height={40} />
                </Link>
            </div>

            {/* 2 buttons */}
            <div className="flex flex-col justify-between gap-4">
                <Image alt="thumbtack.png" src="/thumbtack.png" width={40} height={40} />
                <Image alt="settings.png" src="/settings.png" width={40} height={40} />
            </div>
        </nav>
    );
}